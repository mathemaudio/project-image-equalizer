import type { ApiEndpoints } from './ApiEndpoints.lll'
import type { EndpointPath } from './EndpointPath.lll'

export type EndpointMethod<Path extends EndpointPath> = ApiEndpoints[Path]['method']
