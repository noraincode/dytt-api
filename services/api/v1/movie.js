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

async function addMovie(opt) {
  let where = {
    transName: opt.transName
  }
  let result = await db.Movie.find({where});
  if (result.transName) {
    return;
  } else {
    return db.Movie.create(opt);
  }
}

function getAllMovies() {
  return db.Movie.findAndCountAll();
}