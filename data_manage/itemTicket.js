/**
 * Created by cform on 17/1/10.
 */
const mysql = require('mysql');
const config = require('../config.js');
const path = require('path');
const fs = require('fs');

//使用连接池
const pool = mysql.createPool(config.mysql);

module.exports = {
  //设置开始直播
  startShow: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`UPDATE baseitem SET allowEnter=1 WHERE id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        config.code = 1
        res.json({code: 1});
      })
    })
  },
  //设置停止直播
  stopShow: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`UPDATE baseitem SET allowEnter=0 WHERE id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        config.code = -1
        res.json({code: 1});
      })
    })
  },

  //开始投票
  allowStartTicket: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`UPDATE baseitem SET allowTicket=1 WHERE id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code});
      })
    })
  },
  //停止投票
  allowEndTicket: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`UPDATE baseitem SET allowTicket=0 WHERE id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code});
      })
    })
  },
  //手机发送投票, 事先查看是否已经投过票了
  isAllowMobileSendTicket: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
        var openId = req.openId
      connection.query(`select ticketCount from itemTicketByUser where openId=${openId}`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        var result = result[0]
        res.json({code: config.code, data: result});
      })
    })
  },
  //手机发送投票
  mobileSendTicket: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
        var openId = req.openId
        var itemType = req.itemType
      connection.query(`INSERT INTO itemTicketByUser (id,openId,itemType,ticketCount) VALUES(0,${openId},${itemType},1)`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
      })
    })
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
        var openId = req.openId
        var itemType = req.itemType
      connection.query(`UPDATE itemTicket SET count=count+1 where id=${itemType}`, function(err2, result2) {
        connection.release();
        if (err2) {
          return next(err2);
        }
      })
    })
    res.json({code: config.code, success: true, msg: '投票成功'});
  },


  //设置当前节目ID
  setCurrentItemType: (req, res, next) => {
    pool.getConnection((err, connection) => {
      const params = req.body;
      if (err)
        return next(err);
      var itemtype = params.id
      connection.query(`UPDATE baseitem SET currentItemType=${itemtype} WHERE id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, data: itemtype});
      })
    })
  },
  //查询当前的节目ID
  queryCurrentItemType: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query('select currentItemType from baseitem where id=1', function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, data: result[0]});
      })
    })
  }
}
