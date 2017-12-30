var _ = require('lodash');
var faker = require('faker');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var item1gift = require('./data_manage/item1gift');


io.on('connection', function() {
  console.log('socket is connection')
});

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == "OPTIONS")
    res.send(200);
  else
    next();
  }
);

app.use(bodyParser.json())

/**
* -------------------------------------------- 节目1， 赠送礼物 --------------------------------------------
**/
app.post('/sendGift1', function(req, res, next) {
  item1gift.add(req, res, next)
})

/**
* -------------------------------------------- 节目1， 查询礼物 --------------------------------------------
**/
app.post('/quertGift1', function(req, res, next) {
  item1gift.getAllCount(req, res, next)
})
/**
* -------------------------------------------- 切换场景 --------------------------------------------
**/
app.post('/changeScreen', function(req, res, next) {
  var id = req.body.id
  io.emit('screen', {
    id
  });
  res.json({success: true, id})
})

/**
* -------------------------------------------- 开始投票 --------------------------------------------
**/
app.post('/startTicket', function(req, res, next) {
  res.json({success: true})
})
/**
* -------------------------------------------- 停止投票 --------------------------------------------
**/
app.post('/endTicket', function(req, res, next) {
  res.json({success: true})
})

app.use(express.static('./web/'))
server.listen(8009);
//app.listen(8009);
