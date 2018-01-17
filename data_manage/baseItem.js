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
  //查询基本控制信息
  queryBaseItemInfo: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`select * from baseitem where id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, success: true, data: result[0]});
      })
    })
  },
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
        res.json({code: 1, data: result});
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
  //允许投票
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
  //查询是否可以投票
  searchIsTicket: (req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err)
        return next(err);
      connection.query(`select allowTicket from baseitem where id=1`, function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: config.code, data: result[0]});
      })
    })
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
