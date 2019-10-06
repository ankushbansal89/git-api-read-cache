import cron from 'node-cron'
import { setHealthInCache } from './health-check'
import {
    fetchAndCacheGithubBaseUrl,
    fetchAndCacheNetflixRepos,
    fetchAndCacheNetflixMembers,
    fetchAndCacheNetflixBaseUrl
} from './fetch-cache-github-data'

/**
 * Update the cache and then schedule a cron job to update cache every hour
 *
 * @export
 */
export async function scheduleCacheUpdate() {
    try {
        await updateCache()
        cron.schedule('* */1 * * *', updateCache)
    } catch (e) {
        throw new Error(e)
    }
}

/**
 * Update the cache by making request to github apis and set health of cache to true
 *
 * @export
 */
async function updateCache() {
    console.log('Updating cache...')
    try {
        await Promise.all([
            fetchAndCacheGithubBaseUrl(),
            fetchAndCacheNetflixBaseUrl(),
            fetchAndCacheNetflixMembers(),
            fetchAndCacheNetflixRepos()
        ])
        setHealthInCache(true)
        console.log('Cache update')
    } catch (e) {
        console.log('Error happened while updating the cache', e)
    }
}
