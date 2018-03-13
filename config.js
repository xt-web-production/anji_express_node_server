const path = require('path');

module.exports = {
    appId: 'wxbc8a3b506536d138',
    appSecret: '9921201d63a01a6821e5fbb89106f33f',
    //根目录
    rootPath: path.join(__dirname, '/'),
    //server Ip
    serverIp: '127.0.0.1',
    port:'80',
    code: 1,
    //sql - server地址
    mysql: {
        host: '106.14.144.162', //118.31.19.0  106.14.144.162 localhost
        user: 'root',
        password: '12345678', // 12345678 sXX12345678
        database: 'sxx',
        port: 3306,
    },
};
