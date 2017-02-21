#Hacker News Scraper

Simple command line app written in Node.js/ES6. Scrapes the hacker news homepage and returns top posts in JSON format.

## Quick setup

Clone the repo from github, then open terminal and navigate to the project directory.

You should have node 4.7.3 or higher to run this project.

Run:

`npm install`

`npm install -g hackernews`

After that you can run the app with:

`hackernews --posts <n>`

where n is the number of posts you want returned.

Alternatively, if you don't want to install hackernews globally, you can run the script with:

`./hackerNews.js --posts <n>`

## Sample output
```
[
    {
        "title": "Uber Taps Eric Holder to Investigate Discrimination Claims",
        "uri": "https://www.bloomberg.com/news/articles/2017-02-21/uber-taps-eric-holder-to-look-into-gender-discrimination-claims",
        "author": "rmason",
        "points": 31,
        "comments": 14,
        "rank": 1
    },
    {
        "title": "Ruby `reject!`",
        "uri": "http://accidentallyquadratic.tumblr.com/post/157496054437/ruby-reject",
        "author": "dmit",
        "points": 193,
        "comments": 75,
        "rank": 2
    }
]
```

## Description

- This script will scrape data from the [Hacker News homepage](https://news.ycombinator.com/)
- You can specify how many posts you'd like information for. The data is output to the terminal window
- Story properties will return null if they do not pass validation (and a warning will appear in the console)
- Likewise the imput param (number of posts) is parsed as an integer and then validated
