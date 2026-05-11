import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"MediCare Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
