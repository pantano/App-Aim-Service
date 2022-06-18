const router = require('express').Router();
const { reportList, addReport } = require('../controllers/report.controller.js');

router.get('/', /** isAuth, */ reportList);
router.post('/',/** isAuth, validateReport, */ addReport);
router.delete();
router.patch();





module.exports = router;