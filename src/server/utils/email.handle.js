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

const templateSignUp = (name, password, email) => {
    return `<h2>Hello${name}, from Aim-Service we welcome you.</h2>
    <p>With the following data you will be able to enter our platform.</p>
    <p> Email: ${email} </br>
    Password: ${password}</p></br>
    <p>In your first access we will ask you to change your password.</p>`;
};







module.exports = { 
    sendEmail, 
    templateSignUp
};