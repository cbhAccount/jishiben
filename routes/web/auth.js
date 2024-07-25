var express = require('express');
var router = express.Router();
const UserModel = require('../../modules/UserModel.js');
const md5 = require('md5');
//注册的HTML
router.get('/reg', function(req, res, next) {
  res.render('auth/reg');
});
router.post('/reg', function(req, res, next) {
  //表单验证
  //获取请求体的数据
  console.log(req.body);
  // res.send('注册成功');
  //写入数据库
  UserModel.create({...req.body,password:md5(req.body.password)}).then((data) => {
    console.log('插入成功');
    console.log(data);
    res.render('success', {msg: '注册成功', url: '/login'}); 
  }).catch((err) => {
    console.log('插入失败');
    console.log(err);
    res.render('error', {msg: '注册失败', url: '/reg'}); 
  });
});

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
      //设置session
      req.session.username = data.username;
      req.session.uid = data._id;
      res.render('success', {msg: '登录成功', url: '/account'}); 
    } else{
      //登录失败
      res.render('error', {msg: '登录失败', url: '/login'}); 
    }
  }).catch((err) => {
    console.log('查询失败');
    console.log(err);
    res.render('error', {msg: '登录失败', url: '/login'}); 
  });
});
//退出登录
router.get('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url: '/login'}); 
  });
});
module.exports = router;
