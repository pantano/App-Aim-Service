const router = require('express').Router();
const { reportList, addReport, searchReportByClient } = require('../controllers/report.controller.js');
const isAuth = require('../middlewares/isAuth.js');
const { validateReport } = require('../middlewares/validators.js');

router.get('/', isAuth, reportList);
router.get('/find/:query', isAuth, searchReportByClient);
router.post('/', isAuth, validateReport, addReport);
// router.delete();
// router.patch();




module.exports = router;