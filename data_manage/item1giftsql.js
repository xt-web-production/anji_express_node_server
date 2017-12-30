const anjisql={
    //增
    insert:'INSERT INTO `item1gift` (`id`,`wcname`,`img`,`gift`) VALUES(0,?,?,?)',
    //删
    delete: 'delete from item1gift where id=?',
    //删所有
    deleteall: 'delete from item1gift where 1=1',
    //查所有
    All: 'select * from item1gift',
    //查所有
    queryList: function()=>{
      return `select * from LIMIT ${index}, ${num}`
    },
    //select * from table LIMIT 10,100
    //根据ID查找
    searchById: 'select * from item1gift where id=?',
    //统计数量
    quertCount: 'select count(*) as count from item1gift'

}

module.exports=anjisql;
