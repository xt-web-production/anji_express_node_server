const anjisql={
    //增
    insert:'INSERT INTO `itemgift` (`id`,`itemtype`,`gift`,`name`,`img`) VALUES(0,?,?,?,?)',
    // //删
    // delete: 'delete from itemgift where id=?',
    // //删所有
    // deleteall: 'delete from itemgift where 1=1',
    //查所有
    All: 'select * from itemgift',
    //查所有
    queryGift: function(itemtype, page, pagesize){
      return `select * from itemgift where itemtype=${itemtype} LIMIT ${page}, ${pagesize}`
    },
    //根据ID查找
    searchById: 'select * from itemgift where id=?',
    //统计数量(根据节目查询)
    quertCount: 'select count(*) as count from itemgift where itemtype=?'

}

module.exports=anjisql;
