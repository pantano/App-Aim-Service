const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const tokenSign = async (uid, time) =>{
    try {
       return jwt.sign(uid, secret, {expiresIn: time});
    } catch (error) {
        console.log(error);
    }
};

const tokenVerify = async(token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    tokenSign,
    tokenVerify
};