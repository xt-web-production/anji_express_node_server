const path = require('path');

module.exports = {
    //根目录
    rootPath: path.join(__dirname, '/'),
    //server Ip
    serverIp: '127.0.0.1',
    port:'3000',
    code: -1,
    //sql - server地址
    mysql: {
        host: '106.14.144.162',
        user: 'root',
        password: '12345678',
        database: 'sxx',
        port: 3306,
    },
};
