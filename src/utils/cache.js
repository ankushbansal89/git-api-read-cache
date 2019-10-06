let cache = {}

/**
 * Return value from the cache for a given key
 * @param {String} key
 */
export function getCache(key) {
    if (!key) {
        throw new Error('getCache: key is not defined')
    }
    return cache[key]
}

/**
 * Sets a new value for a given key and return true if it is successful
 * @param {*} key
 * @param {*} value
 */
export function setCache(key, value) {
    if (!key) {
        throw new Error('setCache: key is not defined')
    }
    if (!value) {
        throw new Error('setCache: value is not defined')
    }
    cache[key] = value
    return true
}

/**
 * Set the cache to an empty object
 */
export function clearCache() {
    cache = {}
}
