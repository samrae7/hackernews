'use strict';

const validUrl = require('valid-url');

class Post {
  constructor(titleRow) {
    this.title = this.getTitle(titleRow);
    this.uri = this.getUri(titleRow);
    this.rank = this.getRank(titleRow);
    //use .next to grab next row, which contains author, points and comments
    let authorRow = titleRow.next();
    this.author = this.getAuthor(authorRow);
    this.points = this.getPoints(authorRow);
    this.comments = this.getNoOfComments(authorRow);
    this.validate();
  }

  validate() {
    Post.validateString(this.title);
    Post.validateString(this.author);
    Post.validateUri(this.uri);
    Post.validateInteger(this.points);
    Post.validateInteger(this.comments);
    Post.validateInteger(this.rank);
  }

  getTitle(row) {
    return row.find('.storylink').text();
  }

  getUri(row) {
    let uriString = row.find('.storylink').attr('href');
    return Post.validateUri(uriString);
  }

  getAuthor(row) {
    let authorString = row.find('.hnuser').text();
    return Post.validateString(authorString);
  }

  getPoints(row) {
    let pointsString = row.find('.score').text();
    let points = parseInt(pointsString);
    return Post.validateInteger(points);
  }

  getNoOfComments(row) {
    let noOfCommentsString = row.find('a[href^="hide?"]').next().text();
    let noOfComments = parseInt(noOfCommentsString);
    return Post.validateInteger(noOfComments);
  }

  getRank(row) {
    let rankString = row.find('.rank').text();
    let rank = parseInt(rankString);
    return Post.validateInteger(rank);
  }

  static validateString(suspect) {
    if (
      typeof suspect === 'string'
      && (suspect.length > 0)
      && (suspect.length < 256)
    ){
      return suspect;
    } else {
      throw Error('Invalid string. Strings should be between 1 and 256 characters', suspect);
    }
  }

  static validateUri(suspect) {
    if (validUrl.isUri(suspect)){
      return suspect;
    } else {
      throw Error('Invalid URI', suspect);
    }
  }

  static validateInteger(suspect) {
    if (
      typeof suspect === 'number'
      && suspect >= 0
      && (suspect%1) === 0
    ){
      return suspect;
    } else {
      throw Error('Invalid number: must be integer >= 0', suspect);
    }
  }
}

module.exports = Post;
