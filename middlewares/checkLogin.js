//声明中间件检测登录
let checkLogin = (req, res, next) => {
  if(!req.session.username){
    res.redirect('/login');
    return;
  }
  next();
};
module.exports = checkLogin;