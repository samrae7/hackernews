'use strict';

const validUrl = require('valid-url');

class Story {
  constructor(titleRow) {
    //use .next to grab next row, which contains author, points and comments
    let authorRow = titleRow.next();
    this.title = this.getTitle(titleRow);
    this.uri = this.getUri(titleRow);
    this.author = this.getAuthor(authorRow);
    this.points = this.getPoints(authorRow);
    this.comments = this.getNoOfComments(authorRow);
    this.rank = this.getRank(titleRow);
  }

  getTitle(row) {
    let titleString = row.find('.storylink').text();
    return Story.validateString(titleString);
  }

  getUri(row) {
    let uriString = row.find('.storylink').attr('href');
    return Story.validateUri(uriString);
  }

  getAuthor(row) {
    let authorString = row.find('.hnuser').text();
    return Story.validateString(authorString);
  }

  getPoints(row) {
    let pointsString = row.find('.score').text();
    let points = parseInt(pointsString);
    return Story.validateInteger(points);
  }

  getNoOfComments(row) {
    let noOfCommentsString = row.find('a[href^="hide?"]').next().text();
    let noOfComments = parseInt(noOfCommentsString);
    return Story.validateInteger(noOfComments);
  }

  getRank(row) {
    let rankString = row.find('.rank').text();
    let rank = parseInt(rankString);
    return Story.validateInteger(rank);
  }

  static validateString(suspect) {
    if (
      typeof suspect === 'string'
      && (suspect.length > 0)
      && (suspect.length < 256)
    ){
      return suspect;
    } else {
      console.warn('Invalid string. Strings should be between 0 and 256 characters', suspect);
      return null;
    }
  }

  static validateUri(suspect) {
    if (validUrl.isUri(suspect)){
      return suspect;
    } else {
      console.warn('Invalid URI: ', suspect);
      return null;
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
      console.warn('Invalid: not a positive integer');
      return null;
    }
  }
}

module.exports = Story;
