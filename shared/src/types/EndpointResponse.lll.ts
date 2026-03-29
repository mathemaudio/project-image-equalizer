import type { ApiEndpoints } from './ApiEndpoints.lll'
import type { EndpointPath } from './EndpointPath.lll'

export type EndpointResponse<Path extends EndpointPath> = ApiEndpoints[Path]['response']
