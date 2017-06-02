/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 04:27:54
 * @modify date 2017-04-19 04:27:54
 * @desc [description]
*/

'use strict';

const status = require('./settings');

exports.formatResp = function(options) {
    options = options || {};
    let defaultFormat = options.format || 'JSONString';

    return function formatResp(result, req, res, next){
        if (_.isError(result)){
            result = {
                status  : 'interalErrror',
                code    : 500,
                err     : result,
                msg     : result.message
            };
        }

        let msg  = result.msg || status[result.code].desc;
        let ext  = result.ext || {};
        let err  = result.err;
        let desc = result.desc || status[result.code].desc;
        

        /**
         * 错误处理
         * 
         * @param {any} err
         */
        function handelError(err) {
            logger.err('\nError begin', '\n', err, '\n', 'Error end');
        }
        if (err){
            handelError(err);
        } else {
            let resp = {
                RetSucceed  : true,
                Success     : status[result.code].succeed,
                Code        : result.code,
                Desc        : desc,
                Message     : msg,
                extData     : ext
            };
            let format = defaultFormat;
            if (format === 'JSONString'){
                res.send(JSON.stringify(resp));
            } else {
                res.json(resp);
            }
        }
    };
};