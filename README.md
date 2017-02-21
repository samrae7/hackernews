#Hacker News top Stories Scraper
==

## Quick setup

Clone the repo from github, then from the project directory

'npm install'

'npm install -g hackernews'

After that you can run the app with:

`hackernews --posts <n>`

where n is the number of posts yu want returned.

Alternatively, if you don't want to install hackernews globally, you can run the script with:

`./hackerNews.js --posts <n>`


## Description

> This script will scrape data from the [Hacker News homepage](https://news.ycombinator.com/)
> You can specify how many posts you'd like information for. The data is output to the terminal window
> Story properties will return null if they do not pass validation (and a warning will appear in the console)
