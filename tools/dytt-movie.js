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
  info.transName = $('#Zoom :contains("◎")')[1].children[6].data;  //译名
  info.filmName = $('#Zoom :contains("◎")')[1].children[8].data; //片名
  info.year = $('#Zoom :contains("◎")')[1].children[10].data; //年代
  info.place = $('#Zoom :contains("◎")')[1].children[12].data; //产地
  info.movietype = $('#Zoom :contains("◎")')[1].children[14].data; //类别
  info.language = $('#Zoom :contains("◎")')[1].children[16].data; //语言
  info.subtitles = $('#Zoom :contains("◎")')[1].children[18].data; //字幕
  info.imdb = $('#Zoom :contains("◎")')[1].children[20].data;  //IMDB评分
  info.douban = $('#Zoom :contains("◎")')[1].children[22].data;  //豆瓣评分
  info.director = $('#Zoom :contains("◎")')[1].children[30].data;  //导演
  info.staring = $('#Zoom :contains("◎")')[1].children[32].data;  //主演
  info.image = $('#Zoom').find('img')[1].attribs.src; // 简介图片
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