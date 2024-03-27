// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
const sendEmailVerify = async (subject, to, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'veryycherry@gmail.com',
            pass: 'kth1004^'
        }
    });
    const mailOptions = {
        from: 'veryycherry@gmail.com',
        to: to,
        subject: subject,
        html: html,
    };
    await transporter.sendMail(mailOptions);
};


module.exports = sendEmailVerify