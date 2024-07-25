const e = require('express');
const { type } = require('jquery');
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required: [true, '用户名是必填项'],
  },
  password: {
    type: String,
    required: [true, '用户名是必填项'],
  }
});
 let UserModel = mongoose.model('user', UserSchema);
 module.exports = UserModel;