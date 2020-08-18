var Service = require('../services/service');
const jwt = require('jsonwebtoken');
var SECRET = process.env.JWT_SECRET;
var options = {expiresIn: '20m', subject: 'chatBotConnect'};
require('dotenv').config();

let getLogin = async function (req, res, next) {
    // 인증된 유저 정보로 응답
    var token = jwt.sign({id: process.env.USER}, SECRET, options);
    res.status(200).json({access_token: token});
}

let getApi = async function (req, res, next) {
    try {
        var api = await Service.getApi(req);
        return res.status(200).json(api);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    getLogin : getLogin,
    getApi : getApi
}