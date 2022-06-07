const User = require('../models/user.model');
const { hashPassword, checkPassword } = require('../utils/password.handle');
const { sendEmail, templateSignUp } = require('../utils/email.handle');


/**
 * Users list (only admin rol)
 * 
 * @returns {Object}
 */
const usersList = async (req, res) => {
    try {
        const usersList = await User.find({ rol:'false' });
        return res.status(200).json(usersList);

    } catch (error) {
        return console.log(error);
    }
};

/**
 * Sign up users (only admin rol)
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
        const user = new User({
        companyName: req.body.companyName,
        cuit: req.body.cuit,
        email: req.body.email,
        password
        });
        await user.save();
        await sendEmail(user.email, 'Welcome to Aim-Service', templateSignUp(user.companyName, user.cuit, user.email));

        return res.status(201).json({menssage: `${user.companyName} successfully registered!`});
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
        if(!user) return res.unauthorized('Email or Password wrong.');

        const compare = await checkPassword(req.body.password, user.password);
        if(!compare) return res.unauthorized('Email or Password wrong.');
        
        if(!user.status) {
            return  res/*.render('/auth/changePassword')*/.json({menssage: "status false, cambia la pass macho"})
        } else {
            const userData = {
                _id: user._id,
                companyName: user.companyName,
                cuit: user.cuit,
                email: user.email
            };
            // userData.token = await tokenSign(userData);
            
           return res.status(200).json({ menssage: `User authorized `, userData});
        };
          
    } catch (error) {
        return console.log(error);
    }
};



module.exports = {
    usersList,
    signUp,
    signIn
};