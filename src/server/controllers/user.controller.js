const User = require('../models/user.model');
const { hashPassword } = require('../utils/password.handle');
const { sendEmail, templateSignUp } = require('../utils/email.handle');


/**
 * Sign up users
 * 
 * @param {string}     companyName
 * @param {string}     cuit
 * @param {string}     email
 *  
 * @return {Object}
*/
const signUp = async (req, res) => {
    try {
        const password = await hashPassword(req.body.cuit);
        const userData = {
        companyName: req.body.companyName,
        cuit: req.body.cuit,
        email: req.body.email,
        password
        }
        const newUser = new User(userData);
        await newUser.save()
        await sendEmail(userData.email, 'Welcome to Aim-Service', templateSignUp(userData.companyName, userData.cuit, userData.email));

        return res.status(201).json({menssage: `${userData.companyName} successfully registered!. Password sent to ${userData.email}. `});
    } catch (error) {
        return res.serverError(error.menssage);
    }
}




module.exports = {
    signUp
};