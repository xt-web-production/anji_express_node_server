/**
 * Created by cform on 17/1/10.
 */
const mysql = require('mysql');
const config = require('../config.js');
const $sql = require('./itemGiftSql.js');
const path = require('path');
const fs = require('fs');

//使用连接池
const pool = mysql.createPool(config.mysql);

module.exports = {
  //添加礼物
   addGift: (customSocket, params, res, next) => {
       pool.getConnection((err, connection) => {
           if (err) return next(err);
           var itemtype = params.itemtype
           var gift = params.gift
           var name = params.name
           var img = params.img
           connection.query($sql.insert, [itemtype, gift, name, img], function (err, result) {
             connection.release();
             if (err) {
               return next(err);
             }
             customSocket.emit('gift', Object.assign(params, {id: result.insertId}));
             res.json({
                 code: config.code
             });
           })
       })
   },
  //统计查询
   queryGift: (req, res, next) => {
       pool.getConnection((err, connection) => {
          const params = req.body;
           if (err) return next(err);
           var itemtype = params.itemtype || 1
           var page = params.page || 0
           var pagesize = params.pagesize || 10
           connection.query($sql.queryGift(itemtype,page, pagesize), function (err, result) {
             connection.release();
             if (err) {
               return next(err);
             }
             res.json({
                 code: config.code,
                 data: result
             });
           })
       })
   },
}
