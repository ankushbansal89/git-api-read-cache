import { CACHE_KEYS, GITHUB_BASE_URL } from '../constants'
import { getCache, setCache } from './cache'
import { fetchData } from './fetch-cache-github-data'

/**
 * Perform health check by looking up isHealthy in the cache
 * It also checks if github apis are up or not
 * @export
 * @param {*} req
 * @param {*} res
 */
export async function performHealthCheck(req, res) {
    const key = CACHE_KEYS.IS_HEALTHY_KEY
    const isHealthy = getCache(key)
    const { response } = await fetchData(GITHUB_BASE_URL)
    if (isHealthy && response.status === 200) {
        res.sendStatus(200)
    } else {
        res.sendStatus(503)
    }
}

/**
 * Set the value of isHealthy in the cache
 *
 * @export
 * @param {boolean} [isHealthy=false]
 */
export function setHealthInCache(isHealthy = false) {
    const key = CACHE_KEYS.IS_HEALTHY_KEY
    setCache(key, isHealthy)
}
