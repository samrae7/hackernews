#!/usr/bin/env node
'use strict';

const Story = require('./Story');
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
  .option('-p, --posts <n>', 'Number of posts as integer', parseInt)
  .parse(process.argv);

if (program.posts && Story.validateInteger(program.posts)) {
  let stories = [];
  console.log('Getting top %s Hacker News posts...', program.posts);
  rp(options)
    .then(function ($) {
      //grab rows that contain story title and uri
      $('tr.athing').each(function(i, element) {
        //return false after we have iterated over the specified no. of posts
        if (i >= program.posts) {
          return false;
        }
        //get cheerio object
        let titleRow = $(element);
        let story = new Story(titleRow);
        stories.push(story);
      });
      stories = JSON.stringify(stories, null, 4);

      //using console.log instead of STDOUt.write as console.log uses it anyway
      console.log(stories);
    })
    .catch(function (err) {
      console.error('error', err);
    });
}
