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
  //设置当前节目ID
  setCurrentItemType: (req, res, next) => {
    pool.getConnection((err, connection) => {
      const params = req.body;
      if (err)
        return next(err);
      var itemtype = params.id
      connection.query(`UPDATE baseitem SET currentItemType=${itemtype} WHERE id=1`, [itemtype], function(err, result) {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({code: '1', data: itemtype});
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
        res.json({code: '1', data: result[0]});
      })
    })
  }
}
