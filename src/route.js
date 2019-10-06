import { Router } from 'express'
import {
    getTopNReposByForks,
    getTopNReposByLastUpdate,
    getTopNReposByOpenIssues,
    getTopNReposByStars,
    proxy,
    getGithubBaseUrlFromCache,
    getNetflixBaseUrlFromCache,
    getNetflixMembersFromCache,
    getNetflixReposFromCache
} from './utils/custom-endpoints'
import { performHealthCheck } from './utils/health-check'

const customNetflixRoutes = Router()

customNetflixRoutes.get('/view/top/:n/forks', getTopNReposByForks)
customNetflixRoutes.get('/view/top/:n/last_updated', getTopNReposByLastUpdate)
customNetflixRoutes.get('/view/top/:n/open_issues', getTopNReposByOpenIssues)
customNetflixRoutes.get('/view/top/:n/stars', getTopNReposByStars)
customNetflixRoutes.get('/', getGithubBaseUrlFromCache)
customNetflixRoutes.get('orgs/Netflix', getNetflixBaseUrlFromCache)
customNetflixRoutes.get('/orgs/Netflix/members', getNetflixMembersFromCache)
customNetflixRoutes.get('/orgs/Netflix/repos', getNetflixReposFromCache)
customNetflixRoutes.get('/healthcheck', performHealthCheck)
customNetflixRoutes.get('*', proxy)

export default customNetflixRoutes
