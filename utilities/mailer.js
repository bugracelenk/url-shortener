const nodemailer = require("nodemailer");

const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (to, subject, text) => {
  return await smtpTransporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
  });
};

module.exports = {
  smtpTransporter,
  sendMail,
};
