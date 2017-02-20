#!/usr/bin/env node
'use strict';

const program = require('commander');
const rp = require('request-promise');
const cheerio = require('cheerio'); // Basically jQuery for node.js

const options = {
  uri: 'https://news.ycombinator.com/',
  transform: function (body) {
    return cheerio.load(body);
  }
};

program
  .version('0.0.1')
  .option('-p, --posts <n>', 'get posts')
  .parse(process.argv);

let stories = [];
if (program.posts) {
  console.log('posts', program.posts);
  rp(options)
    .then(function ($) {
      // Process html like you w
      // ould with jQuery...
      // console.log($.html(), 'dollar');
      $('tr.athing').each(function(i, element) {
        let story = {}
        if (i >= program.posts) {
          return false;
        }
        let cheerioObject = $(element);
        story.title = $(element).find('.storylink').text();
        story.uri = $(element).find('.storylink').attr('href');
        story.author = $(element).next().find('.hnuser').text();
        let pointsString = cheerioObject.next().find('.score').text();
        story.points = parseInt(pointsString);
        let commentsString = cheerioObject.next().find('a[href^="hide?"]').next().text();
        story.comments = parseInt(commentsString);
        let rankString = cheerioObject.find('.rank').text();
        story.rank = parseInt(rankString);
        stories.push(story);
      });
      console.log(stories);
    })
    .catch(function (err) {
      // Crawling failed or Cheerio choked...
    });

}
