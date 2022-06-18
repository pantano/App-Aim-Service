const { validationResult, check } = require('express-validator');

const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(400).json({ errors: err.array() })
    }
};


const validatorAddUser = [
    check('name')
    .trim()
    .notEmpty().withMessage('Field cannot be empty')
    .isLength({ min: 4, max: 90 }).withMessage('Character count: min 4, max 90'),
    
    check('cuit')
        .trim()
        .notEmpty().withMessage('Field cannot be empty')
        .isNumeric().withMessage('Only numbers')
        .isLength({ min: 11 }).withMessage('Min character count: 11'),

    check('email')
        .trim()
        .notEmpty().withMessage("Field cannot be empty")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),
    
    validate()
  
];


const validatorPassword = [
    check('password')
    .trim()
    .notEmpty().withMessage('Field cannot be empty')
    .isLength({ min: 8, max: 100}).withMessage('Min character count: 8'),
    
    validate()
];


module.exports = { 
    validatorAddUser, 
    validatorPassword
};