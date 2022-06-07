const router = require('express').Router();
const { usersList, signUp, signIn } = require('../controllers/auth.controller');


router.get('/users', usersList);

router.post('/register', signUp);
router.post('/login', signIn);

module.exports = router;