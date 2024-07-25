const e = require('express');
const { type } = require('jquery');
const mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
  title: {
    type:String,
    required: [true, '标题是必填项'],
  },
  time: {
    type: Date,
    default: new Date()
  },
  type: {
    type: Number,
    enum: [1, -1],
    default: -1,
  },
  account: {
    type:Number,
    required: [true, '金额是必填项'],
  },
  remark: String,
});
 let AccountModel = mongoose.model('account', AccountSchema);
 module.exports = AccountModel;