import { getCache } from './cache'
import { fetchData, GITHUB_BASE_URL } from './fetch-cache-github-data'
import { CACHE_KEYS } from '../constants'

const netflixReposKey = CACHE_KEYS.NETLIX_REPOS

/**
 * Send a response with top n repos based on forks
 * Reads the repo data from cache
 * @export
 * @param {*} { params } request parameters
 * @param {*} res Object to send the response back
 */
export function getTopNReposByForks({ params }, res) {
    const { n } = params
    const repos = getCache(netflixReposKey)
    if (repos) {
        const processedRepos = processRepo({
            repos: [...repos],
            criteria: 'forks',
            n
        })
        res.json(processedRepos)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response with top n repos based on last updated
 * Reads the repo data from cache
 * @export
 * @param {*} { params } request parameters
 * @param {*} res Object to send the response back
 */
export function getTopNReposByLastUpdate({ params }, res) {
    const { n } = params
    const repos = getCache(netflixReposKey)
    if (repos) {
        const processedRepos = processRepo({
            repos: [...repos],
            criteria: 'updated_at',
            n,
            isCriteriaDate: true
        })
        res.json(processedRepos)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response with top n repos based on open issues
 * Reads the repo data from cache
 * @export
 * @param {*} { params } request parameters
 * @param {*} res Object to send the response back
 */
export function getTopNReposByOpenIssues({ params }, res) {
    const { n } = params
    const repos = getCache(netflixReposKey)
    if (repos) {
        const processedRepos = processRepo({
            repos: [...repos],
            criteria: 'open_issues_count',
            n
        })
        res.json(processedRepos)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response with top n repos based on open issues
 * Reads the repo data from cache
 * @export
 * @param {*} { params } request parameters
 * @param {*} res Object to send the response back
 */
export function getTopNReposByStars({ params }, res) {
    const { n } = params
    const repos = getCache(netflixReposKey)
    if (repos) {
        const processedRepos = processRepo({
            repos: [...repos],
            criteria: 'stargazers_count',
            n
        })
        res.json(processedRepos)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response by querying github apis using given url
 *
 * @export
 * @param {*} { url }
 * @param {*} res
 */
export async function proxy({ url }, res) {
    url = url ? `${GITHUB_BASE_URL}${url}` : GITHUB_BASE_URL
    const { data } = await fetchData(url)
    res.send(data)
}

/**
 * Send a response by querying cache for github base url endpoint
 *
 * @export
 * @param {*} req
 * @param {*} res
 */
export function getGithubBaseUrlFromCache(req, res) {
    const key = CACHE_KEYS.GITHUB_BASE_URL
    const cachedData = getCache(key)
    if (cachedData) {
        res.send(cachedData)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response by querying cache for netflix's github base url endpoint
 *
 * @export
 * @param {*} req
 * @param {*} res
 */
export function getNetflixBaseUrlFromCache(req, res) {
    const key = CACHE_KEYS.NETFLIX_BASE_URL
    const cachedData = getCache(key)
    if (cachedData) {
        res.send(cachedData)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response by querying cache for netflix members
 *
 * @export
 * @param {*} req
 * @param {*} res
 */
export function getNetflixMembersFromCache(req, res) {
    const key = CACHE_KEYS.NETLIX_MEMBERS
    const cachedData = getCache(key)
    if (cachedData) {
        res.send(cachedData)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Send a response by querying cache for netflix repos
 *
 * @export
 * @param {*} req
 * @param {*} res
 */
export function getNetflixReposFromCache(req, res) {
    const key = CACHE_KEYS.NETLIX_REPOS
    const cachedData = getCache(key)
    if (cachedData) {
        res.send(cachedData)
    } else {
        res.sendStatus(404)
    }
}

/**
 * Return the list of repos after processing it
 * sort it based on forks, slice it to return top n results and change it to desired shape
 *
 * @param {*} { repos = [], criteria, n, isCriteriaDate = false }
 * @returns
 */
function processRepo({ repos = [], criteria, n, isCriteriaDate = false }) {
    return repos
        .sort((repo1, repo2) => {
            if (isCriteriaDate) {
                return Date.parse(repo2[criteria]) - Date.parse(repo1[criteria])
            }
            return repo2[criteria] - repo1[criteria]
        })
        .slice(0, n)
        .map(repo => {
            return [`Netflix/${repo.name}`, repo[criteria]]
        })
}
