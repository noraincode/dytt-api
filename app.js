/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 01:50:12
 * @modify date 2017-04-19 01:50:12
 * @desc [description]
*/

'use strict';

require('./global_register');
const web = require('./servers/web');
const dytt = require('./tools/dytt-movie');

Promise.resolve([web]).each(function (app){
    app.start();
    if (process.env.MODE_ENV === 'production') {
        //设置一个定时执行任务
    } else {
        //开发环境启动时执行一次
        dytt.getMovie();
    }
});