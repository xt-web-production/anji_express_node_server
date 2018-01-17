const path = require('path');

module.exports = {
    appId: 'wx4dcaf4dca875e624',
    appSecret: '07f5aa7ed3a81b824eeb9ad303a277a4',
    //根目录
    rootPath: path.join(__dirname, '/'),
    //server Ip
    serverIp: '127.0.0.1',
    port:'8009',
    code: 1,
    //sql - server地址
    mysql: {
        host: '118.31.19.0', //118.31.19.0  106.14.144.162 localhst
        user: 'root',
        password: 'sXX12345678', // 12345678
        database: 'sxx',
        port: 3306,
    },
};
