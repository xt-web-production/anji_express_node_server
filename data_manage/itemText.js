/**
 * Created by cform on 17/1/10.
 */
const mysql = require('mysql');
const config = require('../config.js');
const $sql = require('./itemTextSql.js');
const path = require('path');
const fs = require('fs');

//使用连接池
const pool = mysql.createPool(config.mysql);

module.exports = {
  //添加祝福语
   addText: (req, res, next) => {
       pool.getConnection((err, connection) => {
           const params = req.body;
           if (err) return next(err);
           var itemtype = params.itemtype
           var text = params.text
           var name = params.name
           var img = params.img
           connection.query($sql.insert, [itemtype, text, name, img], function (err, result) {
             connection.release();
             if (err) {
               return next(err);
             }
             res.json({
                 code: config.code
             });
           })
       })
   },
  //统计查询
   queryText: (req, res, next) => {
       pool.getConnection((err, connection) => {
          const params = req.body;
           if (err) return next(err);
           var itemtype = params.itemtype || 1
           var page = params.page || 0
           var pagesize = params.pagesize || 10
           connection.query($sql.queryText(itemtype,page, pagesize), function (err, result) {
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
     //屏蔽祝福语
   updateText: (id, res, next) => {
       pool.getConnection((err, connection) => {
           if (err) return next(err);
           connection.query($sql.updateText(id), function (err, result) {
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
   }
}
