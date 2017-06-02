/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 03:54:55
 * @modify date 2017-04-19 03:54:55
 * @desc [description]
*/

'use strict';

const userService = require('../../../services/api/v1/user');

module.exports = {
    getUser
};

async function getUser (req, res, next){
    let options = {
        page: req.query.page || 1,
        pagesize: req.query.pagesize || 10
    };
    let ret = await userService.getUser(options);
    return next({code: 200, status: 'OK', msg: ret});
}