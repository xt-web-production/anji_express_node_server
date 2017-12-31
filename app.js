var _ = require('lodash');
var faker = require('faker');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var itemGift = require('./data_manage/itemGift');
var itemText = require('./data_manage/itemText');
var itemPraise = require('./data_manage/itemPraise');
var baseItem = require('./data_manage/baseItem');

io.on('connection', function(socket) {
  console.log('连接socket');
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
* -------------------------------------------- 节目， 赠送礼物 --------------------------------------------
**/
app.post('/sendGift', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype,
    gift: params.gift,
    name: params.name,
    img: params.img
  }
  **/
  io.emit('gift', req.body);
  itemGift.addGift(req, res, next)
})

/**
* -------------------------------------------- 节目， 查询礼物 --------------------------------------------
**/
app.post('/queryGift', function(req, res, next) {
  /**
  {
    page: params.page,
    pagesize: params.pagesize
  }
  **/
  itemGift.queryGift(req, res, next)
})
/**
* -------------------------------------------- 节目， 发送祝福语 --------------------------------------------
**/
app.post('/addText', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype,
    text: params.text,
    name: params.name,
    img: params.img
  }
  **/
  io.emit('text', req.body);
  itemText.addText(req, res, next)
})

// /**
// * -------------------------------------------- 节目， 查询祝福语 --------------------------------------------
// **/
app.post('/queryText', function(req, res, next) {
  /**
  {
    page: params.page,
    pagesize: params.pagesize
  }
  **/
  itemText.queryText(req, res, next)
})
/**
* -------------------------------------------- 节目， 点赞 --------------------------------------------
**/
app.post('/addPraise', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype
  }
  **/
  // io.emit('text', req.body);
  itemPraise.addPraise(req, res, next)
})

// /**
// * -------------------------------------------- 节目， 查询点赞 --------------------------------------------
// **/
app.post('/queryPraise', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype
  }
  **/
  itemPraise.queryPraise(req, res, next)
})
/**
* -------------------------------------------- 获取当前场景ID --------------------------------------------
**/
app.post('/queryCurrentItemType', function(req, res, next) {
  baseItem.queryCurrentItemType(req, res, next)
})







/**
-------------------------------------------- 控制页面 --------------------------------------------
* -------------------------------------------- 切换场景 --------------------------------------------
**/
app.post('/changeScreen', function(req, res, next) {
  var id = req.body.id
  io.emit('screen', {
    id
  });
  baseItem.setCurrentItemType(req, res, next)
})
/**
* -------------------------------------------- 设置开始直播 --------------------------------------------
**/
app.post('/startShow', function(req, res, next) {
  baseItem.startShow(req, res, next)
})
/**
* -------------------------------------------- 设置停止直播 --------------------------------------------
**/
app.post('/stopShow', function(req, res, next) {
  baseItem.stopShow(req, res, next)
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
