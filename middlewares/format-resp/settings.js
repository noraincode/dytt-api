/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 04:17:20
 * @modify date 2017-04-19 04:17:20
 * @desc [description]
*/

'use strict';

const status = {
    200: {succeed: true,  code: 200, status: 'success',       desc: 'OK! ｡◕‿◕｡'},
    500: {succeed: false, code: 500, status: 'interalErrror', desc: '服务器君在开小差!（￣工￣lll）'},
    404: {succeed: false, code: 404, status: 'notFound',      desc: '接口君出走了! ㄟ( ▔, ▔ )ㄏ'},
    403: {succeed: false, code: 403, status: 'noAuth',        desc: '没有权限! o(´^｀)o'},
};

module.exports = status;