import { RequestHandler } from "express-serve-static-core";
import createHttpError from "http-errors";
import userModel, { User } from "../models/userModel";
import sendToken from "../util/sendToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import nodemailer from "nodemailer";
import { transporter } from "../util/config";
/*  Functionality to implement 
User 
    1)signup user {completed}
    2)login user {completed}
    3)logOutUser 
    4)Get User Details
    5)Forgot Password
    6)Reset Password
    7)Update User Profile
Admin
    1)Get All User details
    2)Get Single User details
    3)Update User Role
    4)Delete Role
*/
type signupBody = {
  name: string;
  number: number;
  email: string;
  gender: string;
  password: string;
};
type loginBody = {
  email: string;
  password: string;
};
export const signupUser: RequestHandler = async (req, res, next) => {
  /* Steps Involve in registering user
    1)Existing user check
    2)Hashed password
    3)User Creation
    4)Token generate
    */
  const { name, number, email, gender, password }: signupBody = req.body;
  try {
    // 1)Existing user check
    // findOne will connect with db and check based on filter(email) that exist or not
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser){
      return res.status(422).json({ msg: "Email Already Exist" });
    }
      // return createHttpError(422,"Email Already Exist");

    // 2)Hashed password- will use bcrypt lib to crete hash of password(already implement using pre-middleware)
    // const hashedPassword = await bcrypt.hash(password,10) //her 10 is number of times function will run

    // 3)User Creation - using create method to store user in db
    const user = await userModel.create({
      name: name,
      number: number,
      email: email,
      gender: gender,
      password: password,
    });
    // 4)Token generate - will use jsonwebtoken lib for token creation
    // const token = jwt.sign({email: user.email,id: user._id},env.JWT_SECRETKEY)
    sendToken(user, 201, res); //by this we are eliminating 4 and 5 steps
    // Sending Response 201 (successfully record created)
    // res.status(201).json({user: user,token: token})
  } catch (error) {
    next(error);
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password }: loginBody = req.body;
  // 1)Check if user Exist
  // 2)Compare credential
  try {
    // 1)check email and password
    if (!email || !password)
      return res.status(401).json({ msg: "Please Enter Email And Password" });
    // 1)finding user in db
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ msg: "User Not Found" });
    // 2) compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch)
      return res.status(401).json({ msg: "Incorrect Password" });
    if(!(user.isUserVerified)) return res.status(401).json({ msg: "Please Verify Your Email" });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const sendVerificationMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;
  // check if user exist

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email not Found" });

    if (user.isUserVerified)
      return res.status(406).json({ msg: "User Already Verify" });

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);
    const jwtToken = jwt.sign({ userId: user._id }, env.JWT_SECRETKEY, {
      expiresIn: "60m",
    });
    

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Shopz1 👻" <shopz1@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "For Email Verification", // Subject line
    html: `Your Verification Link <a href="${env.FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  await user.updateOne({$set: {verifyToken: encryptedToken}})

  res.json({
    mes: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`
  })
  } catch (error) {
    return next(error);
  }
};

export const verifyUserMail: RequestHandler = async(req,res,next) => {
  const {token}: {token: string} = req.body;

  try {
    const decodedToken: any = jwt.verify(token,env.JWT_SECRETKEY)

    const user = await userModel.findById(decodedToken.userId)
    console.log(user);
    
    if(!user) return next(createHttpError(401,"Token Invalid"))

    await user.updateOne({
      $set:  {isUserVerified: true},
      $unset: {verifyToken: 0}
    })

    res.json({msg: 'User Email Verified'})
  } catch (error) {
    next(createHttpError(401,"Token Invalid"))
  }
}
export const sendForgotPasswordMail: RequestHandler = async (
  req,
  res,
  next
) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Found"));

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, env.JWT_SECRETKEY, {
      expiresIn: "60m",
    });

    const info = await transporter.sendMail({
      from: '"Shopz1 👻" <shopz1@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "For Forgot Password Verification Mail", // Subject line
      // text: "Hello world?", // plain text body
      html: `Your Verification for forgot password Link <a href="${env.FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
    });

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    await user.updateOne({ $set: { verifyToken: encryptedToken } });
    res.status(201).send({ msg: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}` })
  } catch (error) {
    return next(error);
  }
};
export const verifyForgotMail: RequestHandler = async (req, res, next) => {
  const { token, password }: { token: string; password: string } = req.body;

  try {
    const decodedToken: any = jwt.verify(token, env.JWT_SECRETKEY);

    const user = await userModel.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Token Invalid"));

    const encryptedPassword = await bcrypt.hash(password, 8);

    await user.updateOne({
      $set: { password: encryptedPassword },
      $unset: { verifyToken: 0 },
    });

    res.json({ message: "Password Changed!" });
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"));
  }
};
export const getUserDetail: RequestHandler = async (req, res, next) => {
  const users = await userModel.find();
  try {
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
