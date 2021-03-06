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
      connection.query(`select ticketCount from itemTicketByUser where openId='${openId}'`, function(err, result) {
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
  mobileSendTicket: (itemType, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`UPDATE itemTicket SET count=count+1 where id=${itemType}`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, success: true, msg: '投票成功'});
      })
    })
  },
  //手机发送礼物记录
  mobileSendGift: (itemType, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`UPDATE itemTicket SET gift=gift+1 where id=${itemType}`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, success: true, msg: '礼物发送记录，保存成功'});
      })
    })
  },
  //手机发送礼物记录
  queryResultTickets: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`select * from itemTicket`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, success: true, data: result});
      })
    })
  }

}
