const router = require('express').Router();
const { addUser, signIn, /*recover*/ } = require('../controllers/auth.controller.js');
const { validatorAddUser } = require('../middlewares/validators.js');



router.post('/newUser', validatorAddUser, addUser);
router.post('/login', signIn);
router.post('/forgot', /*recover*/ ); 



module.exports = router;