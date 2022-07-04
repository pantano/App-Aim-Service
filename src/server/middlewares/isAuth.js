const { tokenVerify } = require('../utils/jwt.handle.js');

const isAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        let error = new Error('No token provided');
        error.status = 403;
        return next(error)
    }

    token = token.split(' ')[1];
    const validateToken = await tokenVerify(token);

    if (validateToken instanceof Error) {
        let error = new Error('Invalid or expired Token');
        error.status = 403;
        return next(error)
    }

    req.user = validateToken._id;
    next();
};

module.exports = isAuth;