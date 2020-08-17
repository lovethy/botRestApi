'use strict';

require('dotenv').config();
var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = process.env.SECRET;
var options = {expiresIn: '10y', subject: 'chatBotConnect'};

// JWT 토큰 생성 함수
let signToken = (id) => {
  return jwt.sign({id: id}, SECRET, options);
}

// 토큰을 해석하여 유저 정보를 얻는 함수
let isAuthenticated = () => {
  return compose()
    // Validate jwt
    .use(async function(req, res, next) {
      try {
        console.log(req.headers.authorization);
        var token = req.headers['x-access-token'] || req.headers.authorization || req.query.token;
        var decode = await decodeToken(token);
        next();
      } catch (err){
        return res.json({message:err.message});
      }
  });
}

let decodeToken = async (token) => {
  return new Promise(
      (resolve, reject) => {
          jwt.verify(token, SECRET, (error, decoded) => {
              if(error) reject(error);
              resolve(decoded);
          });
      }
  );
}

exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;