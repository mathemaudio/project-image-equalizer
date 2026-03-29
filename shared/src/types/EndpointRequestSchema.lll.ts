import type { ApiEndpoints } from './ApiEndpoints.lll'
import type { EndpointPath } from './EndpointPath.lll'

export type EndpointRequestSchema<Path extends EndpointPath> = ApiEndpoints[Path]['requestSchema']
