/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-06-02 14:29:38
 * @modify date 2017-06-02 14:29:38
 * @desc [description]
*/

'use strict';

module.exports = {
  getUser
}

function getUser(opt) {
  return db.User.findAndCountAll({})
}