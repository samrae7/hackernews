#!/usr/bin/env node
'use strict';

const program = require('commander');
const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: 'https://news.ycombinator.com/',
  transform: function (body) {
    return cheerio.load(body);
  }
};

program
  .version('0.0.1')
  .option('--posts <n>')
  .parse(process.argv);

let stories = [];
if (program.posts) {
  console.log('Getting top %s posts', program.posts);
  rp(options)
    .then(function ($) {
      $('tr.athing').each(function(i, element) {
        let story = {}
        if (i >= program.posts) {
          return false;
        }
        let row1 = $(element);
        let row2 = row1.next();
        story.title = row1.find('.storylink').text();
        story.uri = row1.find('.storylink').attr('href');
        story.author = row2.find('.hnuser').text();
        let pointsString = row2.find('.score').text();
        story.points = parseInt(pointsString);
        let commentsString = row2.find('a[href^="hide?"]').next().text();
        story.comments = parseInt(commentsString);
        let rankString = row1.find('.rank').text();
        story.rank = parseInt(rankString);
        stories.push(story);
      });
      console.log(stories);
    })
    .catch(function (err) {
      console.log('error', err);
    });

}
