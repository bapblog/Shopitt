import {  Response } from 'express';
import { User } from '../models/userModel';
import env from '../util/validateEnv'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendToken = (user: User,statusCode: number,res:Response) => {
    const token = user.getJwtToken();
    const option: {
        expires: Date,
        httpOnly: boolean
    } = {
        expires : new Date(Date.now() + env.JWT_EXPIRE ),
        httpOnly : true
    }
    res.cookie("jwt",token,option)
    res.status(statusCode).json({
        success: true,
        user,
        token
    })
}

export default sendToken;