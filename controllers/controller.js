var Service = require('../services/service');
var passport = require('passport');
var auth = require('../auth');

// 패스포트 세팅
require('../passport').setup();

let getLogin = async function (req, res, next) {
    //  패스포트 모듈로 인증 시도
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

        // 인증된 유저 정보로 응답
        var token = auth.signToken(user.id);
        res.json({access_token: token});
    })(req, res, next);
}

let getApi = async function (req, res, next) {
    try {

        var api = await Service.getApi(req);
        return res.json(api);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    getLogin : getLogin,
    getApi : getApi
}