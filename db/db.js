module.exports = function (success, error) {
  if(typeof error !== 'function') {
    //判断error是否是一个函数，如果不是，就给他赋值一个函数
    error = () => {
      console.log('数据库连接失败');
    };
  }
//1.安转mongoose
// npm install mongoose --save
//2.引入mongoose
const mongoose = require('mongoose');

//设置strictQuery为 true
mongoose.set('strictQuery', true);
//3.连接数据库
// mongoose.connect('mongodb://127.0.0.1:27017/qiumenglv')
const {DBNAME, DBPORT, DBHOST} = require('../config/config.js');
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
//4.设置回调函数
mongoose.connection.once('open', function () {
    console.log('数据库连接成功');
    success();
});
mongoose.connection.on('error', function () {
  error();
  console.log('数据库连接失败');
});

//关闭数据库连接
// setTimeout(()=> {
//   mongoose.connection.close();
// }, 3000);

mongoose.connection.on('close', function () {
  console.log('数据库连接断开');
});
}