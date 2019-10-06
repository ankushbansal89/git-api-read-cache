# git api read cache

## Overview
A node express server that caches data from some Github APIs and provide custom end points using cached data. It provides proxy over all the other github endpoint.

## Prerequisites
* node
* npm

## Quick setup
```js
// Build
cd git-api-read-cache
npm install
npm run build // only for production mode

// Running - production mode
$PORT=3000 npm start

// Running - development mode
npm run dev
```

## Requirements
* [x] Setup a server
* [ ] Cache data from / github endpoint
* [ ] Cache data from /orgs/Netflix github endpoint
* [ ] Cache data from /orgs/Netflix/members
* [ ] Cache data from /orgs/Netflix/repos github endpoint
* [ ] Provide custom view for top n repos by number of forks - /view/top/n/forks
* [ ] Provide custom view for top n repos by number of last_updated - /view/top/n/last_updated
* [ ] Provide custom view for top n repos by number of stars - /view/top/n/stars
* [ ] Provide custom view for top n repos by number of open_issues - /view/top/n/open_issues
* [ ] Response of custom views should be in descending order of the criteria
* [ ] Response of custom views should be a list of list - [['Netflix/<repo_name>', <criteria value>]]
* [ ] Provide README.md with building, running & testing instruction
* [ ] Use a GITHUB_API_TOKEN to overcome github's rate limit restrictions
* [ ] Provide a /healthcheck endpoint that returns HTTP 200 when the service is ready to serve API responses.
* [ ] Port number can be passed at the start of the server
* [ ] Cache should be periodically updated

## Technology Used
* Node
* Express
* Javascript
* NPM
* Babel



