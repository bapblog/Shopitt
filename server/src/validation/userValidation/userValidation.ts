// import { RequestHandler } from "express";
// import validator from "../validator";
// import { userSchema } from "./userSchema";

// export const signupUserValidation: RequestHandler = (req,res,next) => 
//         validator(userSchema.signupUser,req,next);

// export const loginUserValidation: RequestHandler = (req,res,next) => 
//         validator(userSchema.loginUser,req,next);
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

export const signupUserValidation: RequestHandler = [
        check('name').exists().withMessage('"name" is required'),
        check('number').exists().withMessage('"number" is required').isNumeric().withMessage('Invalid number').isLength({min: 10}).withMessage('Enter Valid Mobile Number'),
        check('email').exists().withMessage('"email" is required').isEmail().withMessage('Invalid email'),
        check('password').exists().withMessage('"password" is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

        async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({ errors: errors.array()[0].msg});
                }
                next();
        }
] as unknown as RequestHandler;

export const loginUserValidation: RequestHandler = [
        
        check('email').exists().withMessage('email is required').isEmail().withMessage('Invalid email'),
        check('password').exists().withMessage('password" is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({ errors: errors.array()[0].msg});
                }
                next();
        }
] as unknown as RequestHandler;

export const sendVerificationMailValidation: RequestHandler = [
        check('email').exists().withMessage('email is required').isEmail().withMessage('Invalid email'),
        async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({ errors: errors.array()[0].msg});
                }
                next();
        }

]as unknown as RequestHandler;

export const verifyUserMailValidation: RequestHandler = [
        check('token').exists().withMessage('token is required').isString().withMessage('invalid token'),
        async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({ errors: errors.array()[0].msg});
                }
                next();
        }

]as unknown as RequestHandler;

export const sendForgotPasswordMailValidation: RequestHandler = [
        check('email').exists().withMessage('email is required').isEmail().withMessage('Invalid email'),
        async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({ errors: errors.array()[0].msg});
                }
                next();
        }

]as unknown as RequestHandler;

export const verifyForgotMailValidation: RequestHandler = [
        check('token').exists().withMessage('token is required').isString().withMessage('invalid token'),
        check('password').exists().withMessage('password" is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({ errors: errors.array()[0].msg});
                }
                next();
        }

]as unknown as RequestHandler;
