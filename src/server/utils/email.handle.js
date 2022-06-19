const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'shannon.hansen79@ethereal.email',
        pass: 'KKnZc5xUYvmEASfwuJ'
    }
}); 

const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: 'noreply@aim-service.com',
            to: email,
            subject,
            html
        });
    } catch (error) {
        console.log(error);
    }
};

const templateSignUp = (name) => {
    return `<h2>Welcome you.</h2>
    <p>Hello ${name}, registration successfully completed.</p>`;
};

const templateReset = (link) => {
    return `<h2>Password Recovery Service</h2>
    <p>To reset your password please click the link and follow instructions</p>
    <a href="${link}">Click here to reset password</a>`
};


module.exports = { 
    sendEmail, 
    templateSignUp,
    templateReset
};