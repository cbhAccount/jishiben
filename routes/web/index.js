var express = require('express');
var router = express.Router();
const shortid = require('shortid')
//导入 db
const db = require('../../db/db');
const mongoose = require('mongoose');

//导入日期转换格式包
const moment = require('moment');
//导入模版
const AccountModel = require('../../modules/AccountModel');
//初始化数据
/* GET home page. */
//声明中间件检测登录
const checkLogin  = require('../../middlewares/checkLogin');

router.get('/', checkLogin,function(req, res, next) {
  res.redirect('/account');
});
//记账本列表
router.get('/account', checkLogin,function(req, res, next) {
  //判断session是否存在
  if(!req.session.username){
    res.redirect('/login');
    return;
  }
  //获取账单信息
    AccountModel.find().sort({time: -1}).then((data) => {
    res.render('list',{accounts: data,moment: moment});
    console.log(data);
  }).catch((err) => { 
    console.log(err);
    res.status(500).send('服务器错误');
    return;
   });
});
//添加记录
router.get('/account/add',checkLogin, function(req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account',checkLogin, function(req, res, next) {
    //成功提醒
    AccountModel.create({...req.body,time:moment(req.body.time).toDate()}).then((data) => {
      console.log('插入成功');
      console.log(data);
      res.render('success',{msg: '添加成功了~~~',url: '/account'});
    }).catch((err) => {
      res.status(500).send('服务器错误');
      return;
    });
  //获取请求体的数据
  console.log(req.body);
});
//删除记录
router.get('/account/:id',checkLogin, function(req, res, next) {
  //获取id
  let id = req.params.id;
  //删除数据
  AccountModel.deleteOne({_id: id}).then((data) => {
    console.log('删除成功');
    res.render('success',{msg: '删除成功了~~~',url: '/account'});
  }).catch((err) => {
    console.log('删除失败');
    res.status(500).send('服务器错误');
    return;
  });
});
module.exports = router;
