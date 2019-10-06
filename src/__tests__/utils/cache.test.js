import { setCache, getCache, clearCache } from '../../utils/cache'

beforeEach(() => {
    clearCache()
})
describe('setCache', () => {
    it('should set the new value for a given key', () => {
        const key = 'repos'
        const value = ['repo1', 'repo2']
        setCache(key, value)
        expect(getCache(key)).toHaveLength(2)
        expect(getCache(key)).toBe(value)
    })
    it('should throw an error when key is not defined', () => {
        expect(() => {
            setCache()
        }).toThrow()
    })
    it('should throw an error when value is not defined', () => {
        expect(() => {
            setCache('repos')
        }).toThrow()
    })
})

describe('getCache', () => {
    it('should throw an error when key is not defined', () => {
        expect(() => {
            getCache()
        }).toThrow()
    })
})
