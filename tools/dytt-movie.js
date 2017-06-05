'use strict'

const cheerio = require('cheerio');
const rp      = require('request-promise');
const iconv   = require('iconv-lite');

const url     = 'http://www.dytt8.net/html/gndy/dyzz/index.html';
const baseUrl = 'http://www.dytt8.net';

const movieService = require('../services/api/v1/movie.js')

var movieList = [];

module.exports = {
  getMovie
};

async function getMovie() {
  let htmlData = await rp.get({
    uri : url,
    encoding : null,
    timeout: 50000
  })
  let html = iconv.decode(htmlData, 'gb2312');
  let $ = cheerio.load(html, {decodeEntities: false});
  await (async () => {
    for(let i = 0, len = $('.co_content8 .ulink').length; i < len; i++){
      let $element = $($('.co_content8 .ulink')[i]);
      let movieTitle = $element.text();
      let url = $element.attr('href')
      logger.info('正在获取【' + movieTitle + '】的下载链接')
      let movieInfo = await getMovieInfo(url);
      // movieList.push({
      //   title: movieTitle,
      //   info: movieInfo
      // });
      await movieService.addMovie(movieInfo);
      console.log(movieTitle+'保存成功')
    }
  })();
};

async function getMovieInfo(url) {
  let info = {btLink:[]};
  let htmlData = await rp.get({
    uri : baseUrl + url,
    encoding : null,
    timeout: 50000
  })
  let html = iconv.decode(htmlData, 'gb2312');
  let $ = cheerio.load(html, {decodeEntities: false});
  info.poster = $('#Zoom').find('img')[0].attribs.src; //海报图片
  info.image = $('#Zoom').find('img')[1].attribs.src; // 简介图片
  $('#Zoom p')[0].children.forEach((e ,index) => {
    if (e.type == 'text') {
      let val = e.data.replace(/\s+/g, '');
      if (val.indexOf('译名') >= 0) {
        info.transName = val.substr(3);
      } else if (val.indexOf('片名') >= 0) {
        info.filmName = val.substr(3);
      } else if (val.indexOf('年代') >= 0) {
        info.year = val.substr(3);
      } else if (val.indexOf('产地') >= 0) {
        info.place = val.substr(3);
      } else if (val.indexOf('类别') >= 0) {
        info.movietype = val.substr(3);
      } else if (val.indexOf('语言') >= 0) {
        info.language = val.substr(3);
      } else if (val.indexOf('字幕') >= 0) {
        info.subtitles = val.substr(3);
      } else if (val.indexOf('IMDb') >= 0) {
        info.imdb = val.substr(7);
      } else if (val.indexOf('豆瓣') >= 0) {
        info.douban = val.substr(5);
      } else if (val.indexOf('导演') >= 0 && val.length < 50) {
        info.director = val.substr(3);
      } else if (val.indexOf('主演') >= 0 && val.length < 50) {
        info.staring = val.substr(3);
      }
    } 
  })
  //获取下载链接
  $('#Zoom td').children('a').each(function (idx, element) {
    var $element = $(element);
    info.btLink.push({
      bt: $element.attr('href')
    })
  });
  info.btLink = JSON.stringify(info.btLink);
  return info;
}