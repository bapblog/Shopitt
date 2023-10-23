import nodemailer from 'nodemailer'

const testAccount = {
    user: "ud5hl2lssysqro5m@ethereal.email",
    pass: "XMVzyDSmGQerxB8Wxy",
  };
  // create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});