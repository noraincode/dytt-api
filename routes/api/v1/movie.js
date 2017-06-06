/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 03:53:02
 * @modify date 2017-04-19 03:53:02
 * @desc [description]
*/

'use strict';

const movieCtrl = require('../../../controllers/api/v1/movie.js');

const schema = {
    query: {
        page: {
            in : 'query',
            isInt: true,
            defaultValue: 1,
            optional : true 
        },
        pagesize : {
            in : 'query',
            isInt: true,
            defaultValue: 10,
            optional: true
        }
    },
    body: {},
    params: {}
}

const getSchema = _.pick(schema.query, ['page', 'pagesize']);

module.exports = (router) => {
    router.get('/getmovies', movieCtrl.getAllMovies); // checkParams(getSchema),
}