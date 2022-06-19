const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET


const tokenSign = async (user, time) =>{
    return jwt.sign(user, jwt_secret, {expiresIn: time})
};

const tokenVerify = async(token) => {
    try {
        return jwt.verify(token, jwt_secret);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    tokenSign,
    tokenVerify
};