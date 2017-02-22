#!/usr/bin/env node
'use strict';

const Post = require('./Post');
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
  .option('-p, --posts <n>', 'Number of posts as integer', parseInt, null)
  .parse(process.argv);

if (program.posts && Post.validateInteger(program.posts)) {
  let posts = [];
  console.log('Getting top %s Hacker News posts...', program.posts);
  rp(options)
    .then(function ($) {
      //grab rows that contain story title and uri
      $('tr.athing').each(function(i, element) {
        //return false after we have iterated over the specified no. of posts
        if (i >= program.posts) {
          return false;
        } else {
          //get cheerio object
          let titleRow = $(element);
          try {
            let post = new Post(titleRow);
            posts.push(post);
          }
          catch(error) {
            console.warn(`Skipping post ${i}`, error);
          }
        }
      });
      posts = JSON.stringify(posts, null, 4);

      //using console.log instead of STDOUT.write as console.log uses it anyway
      console.log(posts);
    })
    .catch(function (err) {
      console.error('error', err);
    });
}
