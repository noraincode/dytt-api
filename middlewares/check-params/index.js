/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 06:50:32
 * @modify date 2017-04-19 06:50:32
 * @desc [description]
*/

'uss strict';

const sanitizeMap = {
    isInt: 'toInt',
    isFloat: 'toFloat',
    isDate: 'toDate',
    isArray: 'toArray',
    isIntArray: 'toIntArray'
};

module.exports = function (schema) {
    let newSchema = _.cloneDeep(schema);
    return async function(req, res, next){
        for (let key in newSchema){
            if (_.has(newSchema[key], 'defaultValue')){
                delete newSchema[key].defaultValue;
            }
        }
        req.check(newSchema);
        let result = await req.getValidationResult();
        if (!result.isEmpty()){
            let errors = result.useFirstErrorOnly().array();
            let errMsg = `参数${errors[0].param}验证错误!`;
            return next({code: 500, msg: errMsg});
        } else {
            //添加默认值
            for (let key in schema) {
                if (_.has(schema[key], 'defaultValue') && schema[key].in){
                    req[schema[key].in][key] = req[schema[key].in][key] ? req[schema[key].in][key] : schema[key].defaultValue;
                }
                for (let sanitizekey in sanitizeMap) {
                    if (schema[key][sanitizekey]){
                        req.sanitize(key)[sanitizeMap[sanitizekey]]();
                    }
                }
            }
            return next();
        }
    }
};