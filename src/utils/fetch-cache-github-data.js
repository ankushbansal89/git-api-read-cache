import fetch from 'node-fetch'
import parse from 'parse-link-header'
import { setCache } from './cache'

const GITHUB_BASE_URL = 'https://api.github.com'

/**
 * Gets data from github base url and caches it
 */
export async function fetchAndCacheGithubBaseUrl() {
    const key = 'baseUrl'
    try {
        await fetchAndCacheData({
            url: GITHUB_BASE_URL,
            key
        })
    } catch (e) {
        throw new Error('Error fetching and caching github base url', e)
    }
}

/**
 * Gets data from netflix base url
 */
export async function fetchAndCacheNetflixBaseUrl() {
    const key = 'netflix'
    const url = `${GITHUB_BASE_URL}/orgs/Netflix`
    try {
        await fetchAndCacheData({
            url,
            key
        })
    } catch (e) {
        throw new Error('Error fetching and caching github base url', e)
    }
}

/**
 * Gets netflix members list from github api and caches it
 */
export async function fetchAndCacheNetflixMembers() {
    const key = 'members'
    const url = `${GITHUB_BASE_URL}/orgs/Netflix/members?per_page=100`
    try {
        await fetchAndCacheData({
            url,
            key,
            isPagination: true
        })
    } catch (e) {
        throw new Error('Error fetching and caching github base url', e)
    }
}

/**
 * Gets netflix repos list from github api and caches it
 */
export async function fetchAndCacheNetflixRepos() {
    const key = 'repos'
    const url = `${GITHUB_BASE_URL}/orgs/Netflix/repos?per_page=100`
    try {
        await fetchAndCacheData({
            url,
            key,
            isPagination: true
        })
    } catch (e) {
        throw new Error('Error fetching and caching github base url', e)
    }
}

/**
 * Fetches and caches the the date for a given url and key
 * @param {*} { url, key, isPagination = false }
 */
async function fetchAndCacheData({ url, key, isPagination = false }) {
    if (!url) {
        throw new Error('url is not defined')
    }
    if (!key) {
        throw new Error('key is not defined')
    }
    try {
        let data
        if (isPagination) {
            data = (await fetchDataWithPagination(url)).data
        } else {
            data = (await fetchData(url)).data
        }
        setCache(key, data)
    } catch (e) {
        throw new Error(`Error fetch & caching the ${url}`, e)
    }
}

/**
 * Returns the data from github api
 * @param {String} url url to fetch data
 * @returns object containing data and response
 */
async function fetchData(url) {
    if (!url) {
        throw new Error('url is not defined')
    }
    try {
        const header = getRequestHeader()
        const response = await fetch(`${url}`, header)
        const data = await response.json()
        return {
            data,
            response
        }
    } catch (e) {
        throw new Error(`Unable to fetch the response from ${url} url`)
    }
}

/**
 * Returns the data from github api's which support pagination
 * @param {String} url url to fetch data
 * @returns object with data
 */
async function fetchDataWithPagination(url) {
    if (!url) {
        throw new Error('url is not defined')
    }
    let page = 1
    try {
        const data = []
        while (page > 0) {
            const { data: newData, response } = await fetchData(
                `${url}&&page=${page}`
            )
            data.push(...newData)
            page = getNextPage(response)
        }
        return {
            data
        }
    } catch (e) {
        throw new Error(
            `Unable to fetch the response from ${url} url for page ${page}`
        )
    }
}

/**
 * Return request header configuration for github fetch request.
 * Sets authorization token to overcome github's rate-limiting restriction.
 * @param {String} GITHUB_API_TOKEN github outh token
 * @returns headers object with authorization token
 */
function getRequestHeader(
    GITHUB_API_TOKEN = '2ab5851492d65af35b92b4c69aa6653167cfd070'
) {
    return {
        headers: {
            Authorization: `Token ${GITHUB_API_TOKEN}`
        }
    }
}

/**
 * Process the headers of a response and return the next page
 * @param {*} { headers } header of the response
 * @returns next page number if it present else returns 0
 */
function getNextPage({ headers }) {
    if (!headers) {
        throw new Error('getNextPage: headers is not defined')
    }
    const link = headers.get('link')
    let page = 0
    if (link) {
        // using parse function from parse-link-header
        // it converts link into javascript object
        /* {
            next: {
                page: '3',
                per_page: '100',
                rel: 'next',
                url: 'https://api.github.com/user/9287/repos?page=3&per_page=100'
            },
            prev: {
                page: '1',
                per_page: '100',
                rel: 'prev',
                pet: 'cat',
                url: 'https://api.github.com/user/9287/repos?page=1&per_page=100'
            },
            last: {
                page: '5',
                per_page: '100',
                rel: 'last',
                url: 'https://api.github.com/user/9287/repos?page=5&per_page=100'
            }
        } */
        const { next } = parse(link)
        if (next) {
            page = next.page
        }
    }
    return page
}
