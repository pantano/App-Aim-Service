const router = require('express').Router();
const { addUser, signIn, forgot, reset, saveNewPassword } = require('../controllers/auth.controller.js');
const { validatorAddUser, validatorPassword } = require('../middlewares/validators.js');



router.post('/newUser', validatorAddUser, validatorPassword, addUser);
router.post('/login', signIn);

router.post('/forgot', forgot);

router.get('/reset/:token', reset); 
router.post('/reset/:token', validatorPassword, saveNewPassword); 



module.exports = router;