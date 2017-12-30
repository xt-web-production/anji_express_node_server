/**
 * Created by cform on 17/1/10.
 */
const mysql = require('mysql');
const config = require('../config.js');
const $sql = require('./item1giftsql.js');
const path = require('path');
const fs = require('fs');

//使用连接池
const pool = mysql.createPool(config.mysql);

module.exports = {
  //添加商品
   add: (req, res, next) => {
     console.log('add start');
       pool.getConnection((err, connection) => {
           const params = req.body;
           if (err) return next(err);
           var gift = params.gift
           connection.query($sql.insert, [gift], function (err, result) {
               if (result) {
                 res.json({
                     code: '1'
                 });
               }
               connection.release();
           })
       })
   },
  //统计数量
   getAllCount: (req, res, next) => {
       pool.getConnection((err, connection) => {
           if (err) return next(err);
           connection.query($sql.queryAll, function (err, result) {
             if (result) {
               res.json({
                   code: '1',
                   data: result
               });
             }
               connection.release();
           })
       })
   },
}
