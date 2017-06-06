/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 02:02:36
 * @modify date 2017-04-19 02:02:36
 * @desc [description]
*/

'use strict';

const path = require('path');
const pkg  = require('../package.json');

module.exports = {
    web: {
        url : 'http://127.0.0.1:10086',
        host: '127.0.0.1',
        port: 10086,
        name: pkg.name
    },
    view: {
        cache: {},
        engine: 'ejs',
        dir  : 'views'
    },
    log: {
        dir            : path.join(__dirname, '..', `/logs/${pkg.name}/log/`),
        nolog          : /\.(js|css|png|jpg|jpeg|ico|svg|gif)/,
        format         : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
        replaceConsole : true,
        level          : 'AUTO',
        console        : false
    },
    static: {
        dir                 : path.join(__dirname, '../public'),
        main                : path.join(__dirname, '../www/static'),
        maxAge              : 1000*60*60,
        // cache setting
        // pageCacheStatus     : false,
        // pageCacheRedisPre   : 'webStatic',
        // expire              : 60*60*24
    },
    redis: {
        host        : '127.0.0.1',
        port        : 6379,
        db          : 8,
        sessionDB   : 2,
        opt         : {auth_pass: ''}
    },
    mysql: {
        host: 'db4free.net',
        username: 'lrain',
        password: 'password',
        port: 3306,
        database: 'dytt_api',
        connectTimeout: 50000,
        waitForConnections: true,
        connectionLimit: 50,
        logging: true
    }
};