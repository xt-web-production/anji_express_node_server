const anjisql={
    //增
    insert:'INSERT INTO `itemtext` (`id`,`itemtype`,`text`,`name`,`img`) VALUES(0,?,?,?,?)',
    // //删
    // delete: 'delete from itemtext where id=?',
    // //删所有
    // deleteall: 'delete from itemtext where 1=1',
    //查所有
    All: 'select * from itemtext',
    //查所有
    queryGift: function(itemtype, page, pagesize){
      return `select * from itemtext where itemtype=${itemtype} LIMIT ${page}, ${pagesize}`
    },
    //根据ID查找
    searchById: 'select * from itemtext where id=?',
    //统计数量(根据节目查询)
    quertCount: 'select count(*) as count from itemtext where itemtype=?'

}

module.exports=anjisql;
