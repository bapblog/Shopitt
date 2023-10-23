import express from 'express'
import { getUserDetail, loginUser, sendForgotPasswordMail, sendVerificationMail, signupUser, verifyForgotMail, verifyUserMail } from '../controllers/UserControler';
import {  loginUserValidation, sendForgotPasswordMailValidation, sendVerificationMailValidation, signupUserValidation, verifyForgotMailValidation, verifyUserMailValidation } from '../validation/userValidation/userValidation';
const router = express.Router();

// UserRoutes
    //User --> Post Request  
router.post('/signup',signupUserValidation,signupUser);
router.post('/login',loginUserValidation,loginUser);
router.post('/send-verify-mail',sendVerificationMailValidation,sendVerificationMail);
router.post('/verify-user-mail',verifyUserMailValidation,verifyUserMail);
router.post('/forgot-passport',sendForgotPasswordMailValidation,sendForgotPasswordMail);
router.post('/verify-forgot-mail',verifyForgotMailValidation,verifyForgotMail);
    // User --> Get Request
router.get('/users', getUserDetail)

export default router;