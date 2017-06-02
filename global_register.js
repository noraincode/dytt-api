/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 01:51:52
 * @modify date 2017-04-19 01:51:52
 * @desc [description]
*/

global.ROOT_PATH        = __dirname;

global.config           = require('config');
global._                = require('lodash');
global.Promise          = require('bluebird');
global.fse              = require('fs-extra');

global.logger           = require('./tools/logger');
global.db               = require('./models');
global.cache            = require('./lib/cache');
global.handleError      = require('./middlewares/error_handle');
global.checkParams      = require('./middlewares/check-params');