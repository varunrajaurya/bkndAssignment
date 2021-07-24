var express = require('express');
var router = express.Router();
var controller = require('../controllers/student');
const middleware = require ('../middleware,js/token')


router.post('/',controller.login);
router.get('/list',middleware.validateToken,controller.getList);


module.exports = router;
