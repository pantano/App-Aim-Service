const { validationResult, check } = require('express-validator');

const validatorAddUser = [
    check('name')
    .trim()
    .notEmpty().withMessage('Field cannot be empty')
    .isLength({ min: 4, max: 90 }).withMessage('Character count: min 4, max 90'),
    
    check('email')
        .trim()
        .notEmpty().withMessage("Field cannot be empty")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),
          
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next() 
        } catch (err) {
            res.status(400).send({ errors: err.array() })
        }
    }
];


const validatorPassword = [
    check('password')
    .trim()
    .notEmpty().withMessage('Field cannot be empty')
    .isLength({ min: 8, max: 100}).withMessage('Min character count: 8'),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next() 
        } catch (err) {
            res.status(400).send({ errors: err.array() })
        }
    }
];

const validateReport = [
    check('client')
    .trim()
    .notEmpty().withMessage('Field cannot be empty')
    .isLength({ min: 4, max: 90 }).withMessage('Character count: min 4, max 90'),

    check('description')
    .trim()
    .notEmpty().withMessage('Field cannot be empty'),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next() 
        } catch (err) {
            res.status(400).send({ errors: err.array() })
        }
    }
];



module.exports = { 
    validatorAddUser, 
    validatorPassword,
    validateReport
};