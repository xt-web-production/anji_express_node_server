/**
 * Created by cform on 17/1/10.
 */
const mysql = require('mysql');
const config = require('../config.js');

//使用连接池
const pool = mysql.createPool(config.mysql);

module.exports = {
  //添加点赞
   addPraise: (req, res, next) => {
       pool.getConnection((err, connection) => {
           const params = req.body;
           if (err) return next(err);
           var itemtype = params.itemtype
           connection.query(`UPDATE itemPraise SET count=count+1 WHERE id=${itemtype}`, function (err, result) {
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
  //查询点赞数
   queryPraise: (req, res, next) => {
       pool.getConnection((err, connection) => {
           if (err) return next(err);
            const params = req.body;
           var itemtype = params.itemtype
           connection.query(`select count from itemPraise where id=${itemtype}`, function (err, result) {
             connection.release();
             if (err) {
               return next(err);
             }
             res.json({
                 code: config.code,
                 data: result[0]
             });
           })
       })
   },
}
