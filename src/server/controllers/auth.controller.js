const User = require('../models/user.model.js');
const { tokenSign } = require('../utils/jwt.handle.js');
const { hashPassword, checkPassword } = require('../utils/password.handle.js');
const { sendEmail, templateSignUp } = require('../utils/email.handle.js');


/**
 * User profile 
 * 
 * @returns {Object}
 */
const userProfile = async (req, res) => {
    try {
        const userProfile = await User.find({user: req.auth.id});
        return res.status(200).json({message: `Operation success ${userProfile}`});

    } catch (error) {
        return console.log(error);
    }
};

/**
 * Add users 
 * 
 * @param {string}     name
 * @param {string}     cuit
 * @param {string}     email
 *  
 * @return {Object}
*/
const addUser = async (req, res) => {
    try {
        const password = await hashPassword(req.body.password);
        const user = new User({
        name: req.body.name,
        cuit: req.body.cuit,
        email: req.body.email,
        password
        });
        await user.save();
        await sendEmail(user.email, 'Welcome to Aim-Service', templateSignUp(user.name, user.cuit, user.email));

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
        if(!user) return res.unauthorized('Email or Password wrong.');

        const compare = await checkPassword(req.body.password, user.password);
        if(!compare) return res.unauthorized('Email or Password wrong.');
        
        if(!user.status) {
            return  res/*.redirect('/auth/changePassword')*/.json({message: "status false, cambia la pass macho"})
        } else {
            const userData = {
                _id: user._id,
                email: user.email
            };
            const token = await tokenSign(userData, '1h');
         return res.status(200).json({ message: `User authorized `, JWT: token});
        };
          
    } catch (error) {
        return console.log(error);
    }
};


module.exports = {
    usersList,
    userProfile,
    addUser,
    signIn
};