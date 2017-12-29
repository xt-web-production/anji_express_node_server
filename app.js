const _ = require('lodash');
const faker = require('faker');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

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
* -------------------------------------------- 切换场景 --------------------------------------------
**/
app.post('/changeScreen', function(req, res, next) {
  const id = req.body.id
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
