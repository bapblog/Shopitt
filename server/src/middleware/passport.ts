import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";
import env from "../util/validateEnv";
import userModel from "../models/userModel";

const { Strategy } = passportJwt;


// for http only cookie system

const cookieExtractor = (req: Request) => {
  let jwt = null;
  console.log(req.cookies)
  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }
  console.log(jwt)
  return jwt;
};
const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: env.JWT_SECRETKEY,
};
export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      await userModel.findById(payload.id)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};
