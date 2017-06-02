/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 06:00:37
 * @modify date 2017-04-19 06:00:37
 * @desc [description]
*/

'use strict';

let customSanitizers = {
    toArray(value) {
        return (typeof value === 'string') ? JSON.parse(value) : value;
    },
    toIntArray(value) {
        return _.map((typeof value === 'string') ? JSON.parse(value) : value, _.toInteger);
    }
};

let customCheck = {
    isArray(value) {
        try {
            return _.isArray((typeof value === 'string') ? JSON.parse(value) : value);
        } catch (err) {
            logger.err('\nError begin', '\n', err, '\n', 'Error end');
            return false;
        }
    },
    isIntArray(value) {
        try {
            value = (typeof value === 'string') ? JSON.parse(value) : value;
            return _.isArray(value) && _.every(value, (item) => _.isInteger(_.toInteger(item)));
        } catch (err) {
            logger.err('\nError begin', '\n', err, '\n', 'Error end');
            return false;
        }
    }
};

module.exports = {
    customSanitizers,
    customCheck
};