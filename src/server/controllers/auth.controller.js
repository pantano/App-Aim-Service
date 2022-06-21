const User = require('../models/user.model.js');
const { tokenSign, tokenVerify } = require('../utils/jwt.handle.js');
const { hashPassword, checkPassword } = require('../utils/password.handle.js');
const { sendEmail, templateSignUp, templateReset } = require('../utils/email.handle.js');

/**
 * Add users
 * 
 * @param {string}     name
 * @param {string}     email
 * @param {string}     password
 *  
 * @return {Object}
*/
const addUser = async (req, res) => {
    try {
        const password = await hashPassword(req.body.password);
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password
        });
        await user.save();
        await sendEmail(user.email, 'Welcome to Aim-Service', templateSignUp(user.name));

        return res.status(201).json({message: `${user.name} successfully registered!`});
    } catch (error) {
        return console.log(error);
    }
};

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
 const signIn = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(401).json({message: 'Email or Password wrong.'});

        const compare = await checkPassword(req.body.password, user.password);
        if(!compare) return res.status(401).json({message: 'Email or Password wrong.'});
        
        const userData = {
            _id: user._id,
            email: user.email
        };
        const token = await tokenSign(userData, '1h');
        
        return res.status(200).json({ message: `User authorized `, JWT: token});
        
    } catch (error) {
        return console.log(error);
    }
};

/**
 * Forgot
 * @param {string}        email
 *
 * @returns {Object}
 */
const forgot = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).json({message: 'User not found.'});

        const userData = { 
            id: user._id,
            email: user.email,
        };
        const token = await tokenSign(userData, '15m');
        const link = `${process.env.PUBLIC_URL}/auth/reset/${token}`;
        await sendEmail(userData.email, 'Password recovery', templateReset(link));

        return res.status(200).json({message: `We have sent instructions to ${userData.email}`, JWT: token});

    } catch (error) {
        console.log(error);
    }
};

/**
 * Reset
 * 
 */
const reset = async(req, res) => {
    const token = req.params.token;
    const tokenStatus = await tokenVerify(token);

    if (tokenStatus instanceof Error) {
        res.status(403).json({ message: 'Token expired' });
    } else {
        res.render("reset", token );
    };
};

/**
 * Save new password
 * 
 */
const saveNewPassword = async (req, res) => {
    try {
        const token  = req.params.token;
        const tokenStatus = await tokenVerify(token);
        console.log(tokenStatus)
        const newPassword = await hashPassword(req.body.password);
        console.log(req.body.password)
        console.log(newPassword)
        await User.findOneAndUpdate(tokenStatus._id, {password: newPassword});
        return res.status(200).json({ message: 'Password changed'});

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    addUser,
    signIn,
    forgot,
    reset,
    saveNewPassword
};