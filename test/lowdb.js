//导入 lowdb
const low = require('lowdb')
//导入 FileSync
const FileSync = require('lowdb/adapters/FileSync')
//创建一个适配器
const adapter = new FileSync('db.json')
const db = low(adapter)

//初始化数据
db.defaults({ post: [] ,user: {}}).write()
db.get('post').push({ id: 1, title: 'lowdb is awesome'}).write()