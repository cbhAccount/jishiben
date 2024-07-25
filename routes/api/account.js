var express = require('express');
var router = express.Router();
const shortid = require('shortid')
//导入 db
const db = require('../../db/db');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//导入日期转换格式包
const moment = require('moment');
//导入模版
//导入中间件
const checkToken = require('../../middlewares/checkToken');
const AccountModel = require('../../modules/AccountModel');
const { route } = require('../web');
const { data } = require('jquery');
//初始化数据
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//记账本列表
router.get('/account',checkToken, function(req, res, next) {

   //获取账单信息
   AccountModel.find().sort({time: -1}).then((data) => {
    // res.render('list',{accounts: data,moment: moment});
    res.json({
      //响应的编号
      code: '0000',
      //响应的数据
      data: data,
      //响应的信息
      msg: '读取成功'
    });
    console.log(data);
  }).catch((err) => { 
    // console.log(err);
    // res.status(500).send('服务器错误');
    res.json({
      code: '1001',
      msg: '读取失败'
    })
    return;
   }); //获取账单信息

 
});
//添加记录
router.get('/account/add',checkToken, function(req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account',checkToken, function(req, res, next) {
    //成功提醒
    AccountModel.create({...req.body,time:moment(req.body.time).toDate()}).then((data) => {
      // console.log('插入成功');
      // console.log(data);
      // res.render('success',{msg: '添加成功了~~~',url: '/account'});
      res.json({
        code: '0000',
        msg: '添加成功了~~~',
        data: data
      });
    }).catch((err) => {
      // res.status(500).send('服务器错误');
      res.json({
        code: '1001',
        msg: '添加失败',
        data:null
      });
      return;
    });
  //获取请求体的数据
  console.log(req.body);
});
//删除记录
router.delete('/account/:id', function(req, res, next) {
  //获取id
  let id = req.params.id;
  //删除数据
  AccountModel.deleteOne({_id: id}).then((data) => {
    // console.log('删除成功');
    // res.render('success',{msg: '删除成功了~~~',url: '/account'});
    res.json({
      code: '0000',
      msg: '删除成功了~~~',
      data: data
    });
  }).catch((err) => {
    // console.log('删除失败');
    // res.status(500).send('服务器错误');
    res.json({
      code: '1001',
      msg: '删除失败',
      data: null
    });
    return;
  });
});
//获取单个账单信息
router.get('/account/:id', checkToken,function(req, res, next) {
  //获取id
  let id = req.params.id;
  //删除数据
  AccountModel.findOne({_id: id}).then((data) => {
    // console.log('获取成功');
    // res.render('success',{msg: '获取成功了~~~',url: '/account'});
    res.json({
      code: '0000',
      msg: '获取成功了~~~',
      data: data
    });
  }).catch((err) => {
    // console.log('获取失败');
    // res.status(500).send('服务器错误');
    res.json({
      code: '1001',
      msg: '获取失败',
      data: null
    });
    return;
  });
});

//更新数据
router.patch('/account/:id',checkToken, function(req, res, next) {
  //获取id
  let id = req.params.id;
  //更新数据
  AccountModel.updateOne({_id: id},req.body).then((data) => {
    //再次查询数据库
    AccountModel.findOne({_id: id}).then((data) => {
      res.json({
        code: '0000',
        msg: '查询成功',
        data: data
      });
    }).catch((err) => {
      res.json({
        code: '1001',
        msg: '查询失败',
        data: null
      });
      return;
    })
  }).catch((err) => {
    res.json({
      code: '1001',
      msg: '更新失败',
      data: null
    });
    return;
  })
});

module.exports = router;
