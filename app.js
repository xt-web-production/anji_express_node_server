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
var qs = require('querystring');
var request = require('request');
var customSocket = io
var bigCustomSocket = io
io.on('connection', function(socket) {
  socket.on('customSocket', function(data) {
    customSocket = socket
  });
  socket.on('bigCustomSocket', function(data) {
    bigCustomSocket = socket
  });
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

app.post('/getToken', function(req, res, next) {
  let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
  let params = {
    appid: config.appId,
    secret: config.appSecret,
    code: req.body.code,
    grant_type: 'authorization_code'
  };
  let options = {
    method: 'get',
    url: reqUrl + qs.stringify(params)
  };
  request(options, function(err, respon, body) {
    if (err)
      return next(err);
    if (body) {
      const _body = JSON.parse(body)
      console.log(_body);
      const access_token = _body.access_token
      const openid = _body.openid
      const userOption = {
        method: 'get',
        url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN'
      };
      request(userOption, function(userErr, userRes, userBody) {
        if (userErr)
          return next(userErr);
        res.json({code: 1, success: true, data: userBody})
      })
    } else {
      res.json({code: 1, success: false, data: {}})
    }
  })
})

/**
 * -------------------------------------------- 进入直播间 --------------------------------------------
 **/
app.post('/enterShow', function(req, res, next) {
  const params = req.body;
  customSocket.emit('userEnter', {data: params});
  res.json({code: config.code});
})

/**
* -------------------------------------------- 节目， 赠送礼物 --------------------------------------------
**/
app.post('/sendGift', function(req, res, next) {
  customSocket.emit('gift', Object.assign(req.body));
  itemTicket.mobileSendGift(req.body.itemtype, res, next)
  //itemGift.addGift(customSocket, req.body, res, next)
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
  itemText.addText(req, res, next)
})

// /**
// * -------------------------------------------- 节目， 查询祝福语 --------------------------------------------
// **/
app.post('/queryText', function(req, res, next) {
  itemText.queryText(req, res, next)
})
// -------------------------------------------- 修改祝福语类型为 不上传 allowsend = 0 --------------------------------------------
app.post('/updateText', function(req, res, next) {
  itemText.updateText(req.body.id, res, next)
})
// -------------------------------------------- 发送祝福语 并将 allowsend = 0 --------------------------------------------
app.post('/sendText', function(req, res, next) {

  customSocket.emit('text', req.body);
  //customSocket.emit('text', Object.assign(req.body, {id: Math.random(), name: 'name' + Math.random(), text: 'text' + Math.random()}));
  itemText.updateText(req.body.id, res, next)
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
  const itemtype = req.body.itemtype || 1
  customSocket.emit('praise', itemtype);
  itemPraise.addPraise(itemtype, res, next)
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

// * -------------------------------------------- 手机投票，事先查看是否已经可以投票 --------------------------------------------
// **/
app.post('/searchIsTicket', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype
  }
  **/
  baseItem.searchIsTicket(req, res, next)
})

// -------------------------------------------- 手机进行投票 --------------------------------------------
app.post('/mobileSendTicket', function(req, res, next) {
  /**
  {
    itemtype: params.itemtype
  }
  **/
  itemTicket.mobileSendTicket(req.body.itemType, res, next)
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
  io.emit('screen', {id});
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
  baseItem.allowStartTicket(req, res, next)
})
/**
* -------------------------------------------- 停止投票 --------------------------------------------
**/
app.post('/allowEndTicket', function(req, res, next) {
  baseItem.allowEndTicket(req, res, next)
})
/**
* -------------------------------------------- 获取投票点数 --------------------------------------------
**/
app.post('/queryResultTickets', function(req, res, next) {
  itemTicket.queryResultTickets(req, res, next)
})

/**
* -------------------------------------------- 查询基本控制信息 --------------------------------------------
**/
app.post('/queryBaseItemInfo', function(req, res, next) {
  baseItem.queryBaseItemInfo(req, res, next)
})

/**
* -------------------------------------------- 切换大屏页面 --------------------------------------------
**/
app.post('/changeBigPage', function(req, res, next) {
  var routeName = req.body.routeName
  bigCustomSocket.emit('changeBigPage', {routeName})
  res.json({code: config.code});
})

app.use(express.static('./'))
server.listen(config.port);
//app.listen(8009);
