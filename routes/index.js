var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');
var auth = require('../auth');

/* GET home page. */
router.post('/', controller.getLogin);
//router.post('/api', controller.getApi);
router.post("/api", auth.isAuthenticated(), controller.getApi);

module.exports = router;