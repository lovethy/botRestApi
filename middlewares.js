const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers['x-access-token'] || req.headers.authorization, process.env.JWT_SECRET);
    return next();
  }
  catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.'
    });
  }
}

exports.tokenLimiter = new RateLimit({
  windowMs: 1000 * 60, // 기준 시간 (1000ms * 60 = 1분)
  max: 1, // 허용 횟수
  delayMs: 0, // 호출 간격
  handler(req, res) { // 제한 초과 시 콜백함수
    res.status(this.statusCode).json({
      code: this.statusCode, // 기본값: 429
      msg: '1분에 한 번만 요청할 수 있습니다.',
    });
  },
});

exports.apiLimiter = new RateLimit({
  windowMs: 1000, // 기준 시간 (1000ms * 60 = 1분)
  max: 1, // 허용 횟수
  delayMs: 0, // 호출 간격
  handler(req, res) { // 제한 초과 시 콜백함수
    res.status(203).json({
      code: this.statusCode, // 기본값: 429
      msg: '질의어를 너무 많이 입력하셨습니다.',
    });
  },
});