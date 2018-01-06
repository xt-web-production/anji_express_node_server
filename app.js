var _ = require('lodash');
var faker = require('faker');
var config = require('./config.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var itemGift = require('./data_manage/itemGift');
var itemText = require('./data_manage/itemText');
var itemPraise = require('./data_manage/itemPraise');
var itemTicket = require('./data_manage/itemTicket');
var baseItem = require('./data_manage/baseItem');
var customSocket = io
// io.on('connection', function(socket) {
//   socket.on('customSocket', function (data) {
//     console.log('connect- bigscreen');
//               customSocket = socket
//           });
// });

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

 app.post('getToken', function(req, res, next){
   var code = req.body
   let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
   let params = {
     appid: config.appId,
     secret: config.appSecret,
     code: code,
     grant_type: 'authorization_code'
   };

   let options = {
     method: 'get',
     url: reqUrl+qs.stringify(params)
   };
   return new Promise((resolve, reject) => {
     request(options, function (err, res, body) {
       if (res) {
         resolve(body);
       } else {
         reject(err);
       }
     })
   })
 })

 /**
 * -------------------------------------------- 进入直播间 --------------------------------------------
 **/
 app.post('/enterShow', function(req, res, next) {
   const params = req.body;
   console.log(params);
   customSocket.emit('userEnter', {
     data:params
   });
    res.json({code: config.code});
 })

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
  customSocket.emit('text', req.body);
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
  console.log(req.body);
  customSocket.emit('praise', req.body);
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

// * -------------------------------------------- 手机投票，事先查看是否已经投过票了 --------------------------------------------
// **/
app.post('/isAllowMobileSendTicket', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype
  }
  **/
  var params = req.body
  itemTicket.isAllowMobileSendTicket(params, res, next)
})

// -------------------------------------------- 手机进行投票 --------------------------------------------
app.post('/mobileSendTicket', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype
  }
  **/
  var params = req.body
  itemTicket.mobileSendTicket(params, res, next)
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
* -------------------------------------------- 开始投票（控制台） --------------------------------------------
**/
app.post('/allowStartTicket', function(req, res, next) {
  baseItem.startTicket(req, res, next)
})
/**
* -------------------------------------------- 停止投票 --------------------------------------------
**/
app.post('/allowEndTicket', function(req, res, next) {
  baseItem.endTicket(req, res, next)
})
/**
* -------------------------------------------- 查询投票资格 --------------------------------------------
**/
app.post('/searchIsTicket', function(req, res, next) {
  baseItem.searchIsTicket(req, res, next)
})

app.use(express.static('./'))
server.listen(80);
//app.listen(8009);
