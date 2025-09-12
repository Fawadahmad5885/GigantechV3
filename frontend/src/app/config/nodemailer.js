import nodemailer from "nodemailer";

const email = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

export const transporter = nodemailer.createTransport({
  host: "smtp.zohocloud.ca",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOption = {
    from:email,
    to:email,
}