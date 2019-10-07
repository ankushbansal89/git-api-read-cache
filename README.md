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
PORT=<port-number> GITHUB_API_TOKEN=<github-api-token> npm start

// Running - development mode
PORT=<port-number> GITHUB_API_TOKEN=<github-api-token> npm run dev
```

## Requirements
* [x] Setup a server
* [x] Cache data from / github endpoint
* [x] Cache data from /orgs/Netflix github endpoint
* [x] Cache data from /orgs/Netflix/members
* [x] Cache data from /orgs/Netflix/repos github endpoint
* [x] Provide custom view for top n repos by number of forks - /view/top/n/forks
* [x] Provide custom view for top n repos by number of last_updated - /view/top/n/last_updated
* [x] Provide custom view for top n repos by number of stars - /view/top/n/stars
* [x] Provide custom view for top n repos by number of open_issues - /view/top/n/open_issues
* [x] Response of custom views should be in descending order of the criteria
* [x] Response of custom views should be a list of list - [['Netflix/<repo_name>', <criteria value>]]
* [x] Except for custom endpoint, create proxy for all other routes
* [x] Provide README.md with building, running & testing instruction
* [x] Use a GITHUB_API_TOKEN to overcome github's rate limit restrictions
* [x] Provide a /healthcheck endpoint that returns HTTP 200 when the service is ready to serve API responses.
* [x] Port number can be passed at the start of the server
* [x] Cache should be periodically updated

## High Level Design
### Assumptions
1. Data to be cached is not too large < 5 MB. 
2. Load balancing will be handled by consumer of the service.
3. Data update on github website is not frequent.

### Design
1. It is a node express which provide rest endpoints. List of supported endpoints can be found in route.js.
2. Since data to be cached is not too large, using javascript object to cache the data. If needed, it can be easily switched to redis/memcache in cache.js.
3. Cache is updated every 1 hour. If needed, tt can be easily changed in cron.js.
4. When server starts, request to update the cache is made. Once it is successful, server is started.
5. Index.js is the entry point to the app.
6. For health check, we are performing two checks:
   1. if cache is ready or not
   2. if http://api.github.com is available or not

## Technology Used
* Node
* Express
* Javascript
* NPM
* Babel