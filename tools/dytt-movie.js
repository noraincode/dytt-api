'use strict'

const cheerio = require('cheerio');
const rp      = require('request-promise');
const iconv   = require('iconv-lite');

const url     = 'http://www.dytt8.net/html/gndy/dyzz/index.html';
const baseUrl = 'http://www.dytt8.net';

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
      logger.info('正在获取【' + movieTitle + '】的下载链接')
      let movieBt = await getBtLink($element.attr('href'));
      movieList.push({
        title: movieTitle,
        link: movieBt
      })
    }
  })();

  console.log(movieList)
};

async function getBtLink(url) {
  var btLink = [];
  let htmlData = await rp.get({
    uri : baseUrl + url,
    encoding : null,
    timeout: 50000
  })
  let html = iconv.decode(htmlData, 'gb2312');
  let $ = cheerio.load(html, {decodeEntities: false});
  $('#Zoom td').children('a').each(function (idx, element) {
    var $element = $(element);
    btLink.push({
      bt: $element.attr('href')
    })
  })
  return btLink;
};