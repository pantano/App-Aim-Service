const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET


const tokenSign = async (user, time) =>{
    return jwt.sign(user, JWT_SECRET, {expiresIn: time})
};

const tokenVerify = async(token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    tokenSign,
    tokenVerify
};