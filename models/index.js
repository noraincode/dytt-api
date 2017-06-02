/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 03:38:02
 * @modify date 2017-04-19 03:38:02
 * @desc [description]
*/

'use strict';

const config        = require('config');
const Sequelize     = require('sequelize');
const path          = require('path');
const fs            = require('fs');
const _             = require('lodash');

const db = {};

let sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password,{
    host: config.mysql.host,
    port:config.mysql.port,
    dialect: 'mysql'
});

fs
    .readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf('.') !== -1) && (file !== 'index.js');
    })
    .forEach(function(file){
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);