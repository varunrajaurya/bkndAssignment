var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');
const middleware = require('../middleware,js/token');

/* GET users listing. */
router.post('/',controller.adminData);
router.post('/post',controller.posts);
router.put('/post/:id',middleware.validateToken,controller.updatePost);
router.delete('/post/:id', middleware.validateToken, controller.deletePost);


module.exports = router;
