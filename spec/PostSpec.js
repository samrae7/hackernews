'use strict';

describe('Post', function() {
  const Post = require('../Post');
  const Cheerio = require('cheerio');
  let post,
    mockTitle,
    mockAuthor,
    mockRank,
    transformedRank,
    mockUri,
    mockNoOfComments,
    transformedNoOfComments,
    mockPoints,
    transformedPoints;

  function createMockHtml(rank, uri, title, points, author, noOfComments) {
    return `<tr class='athing' id='22222222'>
               <td align="right" valign="top" class="title"><span class="rank">${rank}</span></td>
               <td valign="top" class="votelinks">
                 <center>
                   <a id='up_13696636' href='vote?id=13696636&amp;how=up&amp;goto=news'>
                   <div class='votearrow' title='upvote'></div></a>
                 </center>
               </td>
               <td class="title">
                 <a href="${uri}" class="storylink">${title}</a>
                 <span class="sitebit comhead"> (
                   <a href="from?site=ar.al"><span class="sitestr">ar.al</span></a>)
                 </span>
               </td>
              </tr>
             <tr>
               <td colspan="2"></td>
               <td class="subtext">
                 <span class="score" id="score_13696636">${points}</span> 
                 by <a href="user?id=HurrdurrHodor" class="hnuser">${author}</a> 
                 <span class="age"><a href="item?id=13696636">45 minutes ago</a></span> 
                 <span id="unv_13696636"></span> | <a href="hide?id=13696636&amp;goto=news">hide</a> | 
                 <a href="item?id=13696636">${noOfComments}</a>
               </td>
             </tr>`;
  }

  beforeEach(() => {
    mockTitle = 'Foo is really bar';
    mockAuthor = 'Shakespeare';
    mockRank = '7.';
    transformedRank = 7;
    mockUri = 'https://www.foo.com/bar';
    mockNoOfComments = '66 comments';
    transformedNoOfComments = 66;
    mockPoints = '88 points';
    transformedPoints = 88;


    let mockHtml = createMockHtml(
      mockRank,
      mockUri,
      mockTitle,
      mockPoints,
      mockAuthor,
      mockNoOfComments
    );

    let $ = Cheerio.load(mockHtml);
    let rows = $('tr.athing');

    post = new Post(rows.first());
  });

  it('should be defined', function() {
    expect(post).toBeDefined();
  });

  it('should have the expected properties based on the values in the HTML', function() {
    expect(post.title).toBe(mockTitle);
    expect(post.author).toBe(mockAuthor);
    expect(post.uri).toBe(mockUri);
    expect(post.rank).toBe(transformedRank);
    expect(post.comments).toBe(transformedNoOfComments);
    expect(post.points).toBe(transformedPoints);
  });

  describe('WHEN the title is an empty string', function() {
    let rows,
      postConstructor;

    beforeEach(() => {
      mockTitle = '';
      mockAuthor = 'Shakespeare';
      mockRank = '7.';
      mockUri = 'https://www.foo.com/bar';
      mockNoOfComments = '66 comments';
      mockPoints = '88 points';

      let mockHtml = createMockHtml(
        mockRank,
        mockUri,
        mockTitle,
        mockPoints,
        mockAuthor,
        mockNoOfComments
      );

      let $ = Cheerio.load(mockHtml);
      rows = $('tr.athing');
      postConstructor = function() {
        return new Post(rows.first());
      }
    });

    it('should throw an error', function() {
      expect(postConstructor).toThrowError();
    });

  });

});
