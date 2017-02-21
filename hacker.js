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

class Story {
  constructor(row1) {
    //use .next to grab next row, which contains author, points and comments
    let row2 = row1.next();
    this.title = this.getTitle(row1);
    this.uri = this.getUri(row1);
    this.author = this.getAuthor(row2);
    this.points = this.getPoints(row2);
    this.comments = this.getComments(row2);
    this.rank = this.getRank(row1);
  }

  getTitle(row) {
    return row.find('.storylink').text();
  }

  getUri(row) {
    return row.find('.storylink').attr('href');
  }

  getAuthor(row) {
    return row.find('.hnuser').text();
  }

  getPoints(row) {
    let pointsString = row.find('.score').text();
    return parseInt(pointsString);
  }

  getComments(row) {
    let commentsString = row.find('a[href^="hide?"]').next().text();
    return parseInt(commentsString);
  }

  getRank(row) {
    let rankString = row.find('.rank').text();
    return parseInt(rankString);
  }


}

if (program.posts) {
  let stories = [];
  console.log('Getting top %s posts...', program.posts);
  rp(options)
    .then(function ($) {
      //grab rows that contain story title and uri
      $('tr.athing').each(function(i, element) {
        //return false after we have iterated over the specified no. of posts
        if (i >= program.posts) {
          return false;
        }
        //get cheerio object
        let row1 = $(element);
        let story = new Story(row1);
        stories.push(story);
      });
      console.log(stories);
    })
    .catch(function (err) {
      console.log('error', err);
    });
}
