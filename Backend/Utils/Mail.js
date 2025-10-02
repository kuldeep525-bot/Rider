//firstly install npm i nodemailer
//nodemailer help to send mail

import nodemailer from "nodemailer";
// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "rider97797@gmail.com",
    pass: "gnjs bdre kibc kdxy",
  },
});

export const sendotpMail = async (to, otp) => {
  await transporter.sendMail({
    from: "rider97797@gmail.com",
    to,
    subject: "Reset Your Password",
    html: `<p>Your Otp for password reset is <b>${otp}</b>.It expires in 5 minutes`,
  });
};
