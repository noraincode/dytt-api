/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 02:29:38
 * @modify date 2017-04-19 02:29:38
 * @desc [description]
*/

'use strict';

const path              = require('path');
const mysql             = require('mysql');
const responseTime      = require('response-time');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const serveFavicon      = require('serve-favicon');
const expressSession    = require('express-session');
const express           = require('express');
const config            = require('config');
const ejs               = require('ejs');
const expressValidator  = require('express-validator');
const sessStore         = require('connect-redis')(expressSession);
const compression       = require('compression');

const pkg               = require('../package.json');
const router            = require('../routes');
const formatResp        = require('../middlewares/format-resp');
const checkParmaSetting = require('../middlewares/check-params/settings');

const app = express();

app.set('views', path.join(__dirname, '..', config.view.dir));
app.set('view engine', config.view.engine);

app.engine('.html', ejs.__express);
app.engine('.ejs', ejs.__express);

app.use(compression());
app.use(responseTime());
app.use(logger.log4js.connectLogger(logger, config.log));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    proxy               : true,
    resave              : true,
    saveUninitialized   : false,
    name                : pkg.name,
    secret              : pkg.name + 'secret',
    store: new sessStore({
        host: config.redis.host,
        port: config.redis.port,
        db  : config.redis.sessionDB || config.redis.db,
    }),
    cookie              : {maxAge: 1000*60*60*24},
}));

app.use(serveFavicon(path.join(__dirname, '../public/fav.ico')));
app.use(express.static(config.static.dir, {maxAge: config.static.maxAge}));
app.use(express.static(config.static.main));
app.use(expressValidator(checkParmaSetting));

app.use(router);

app.use((req, res, next) => next({code : 404}));

app.use(formatResp.formatResp({format: 'JSON'}));

function start(){
    initDataBase((err) => {
        if (err){
            logger.error(err)
        } else {
            app.listen(config.web.port, function(){
                logger.info(config.web.name, config.web.url, 'start up!')
            });
        }
    });
}

function initDataBase(callback){
    let con = mysql.createConnection({
        host: config.mysql.host,
        database: 'mysql',
        user: config.mysql.username,
        password: config.mysql.password
    });
    con.connect();
    let sql = `create database if not exists ${config.mysql.database} default charset utf8 collate utf8_general_ci`;
    con.query(sql, (err, results) => {
        if (err) {
            return callback(err)
        } else {
            db.sequelize.sync({force: false}).then(() => callback(null, results)).catch((err) => callback(err));
        }
    });
}

if (!module.parent) {
    start();
} else {
    exports.start = start;
}