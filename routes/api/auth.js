var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../../modules/UserModel.js');
const md5 = require('md5');
//登录的HTML
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});
router.post('/login', function(req, res, next) {
  //表单验证
  //获取请求体的数据
  console.log(req.body);
  // res.send('登录成功');
  //查询数据库
  UserModel.findOne({username: req.body.username, password: md5(req.body.password)}).then((data) => {
    console.log('查询成功');
    console.log(data);
    if(data){
      //登录成功
      //响应token
      let token = jwt.sign({
        username: data.username,
        uid: data._id
      }, 'qiumenglv', {
        expiresIn: 60 * 60 * 24 //单位是s
      });
      console.log(token)
      res.json({
        code: '2000', 
        msg: '登录成功',
        data: token
      });
      // res.render('success', {msg: '登录成功', url: '/account'}); 
    } else{
      //登录失败
      res.json({
        code: '2001', 
        msg: '用户或密码错误',
        data: null});
    }
    return 
  }).catch((err) => {
    console.log('查询失败');
    console.log(err);
      return  res.json({
      code: '5000', 
      msg: '服务器错误',
      data: null});
  });
  });
//退出登录
router.get('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url: '/login'}); 
  });
});
module.exports = router;
