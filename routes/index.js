var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');
//var auth = require('../auth');
const { verifyToken, apiLimiter } = require('../middlewares');

/* GET home page. */
router.post('/', verifyToken, controller.getLogin);
router.post("/api", verifyToken, apiLimiter, controller.getApi);

module.exports = router;