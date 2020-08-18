var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');
var auth = require('../auth');

/* GET home page. */
router.post('/', auth.isAuthenticated(), controller.getLogin);
router.post("/api", auth.isAuthenticated(), controller.getApi);

module.exports = router;