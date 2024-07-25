//声明中间件检测token
//导入jwt
const jwt = require('jsonwebtoken');
//导入md5
const md5 = require('md5');
//声明中间件
let checkToken = (req, res, next) => {
  //获取token
  let token = req.get('token');
  if(!token){
    res.json({
      code: '401',
      msg: '未登录',
      data: null
    });
    return;
  }
  //验证token
  jwt.verify(token, 'qiumenglv', (err, decode) => {
    if(err){
      res.json({
        code: '401',
        msg: 'token失效，请重新登录',
        data: null
      });
      return;
    }
    next();
  });
};
module.exports = checkToken;