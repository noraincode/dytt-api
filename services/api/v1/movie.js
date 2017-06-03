/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-06-02 14:29:38
 * @modify date 2017-06-02 14:29:38
 * @desc [description]
*/

'use strict';

module.exports = {
  addMovie,
  getAllMovies
}

function addMovie(opt) {
  return db.Movie.create(opt);
}

function getAllMovies() {
  return db.Movie.findAndCountAll();
}