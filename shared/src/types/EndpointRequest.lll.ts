import type { ApiEndpoints } from './ApiEndpoints.lll'
import type { EndpointPath } from './EndpointPath.lll'

export type EndpointRequest<Path extends EndpointPath> = ApiEndpoints[Path]['request']
