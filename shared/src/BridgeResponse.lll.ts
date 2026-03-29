import type { EndpointPath } from './types/EndpointPath.lll'
import type { EndpointResponse } from './types/EndpointResponse.lll'
import type { BridgeJsonResponse } from './BridgeJsonResponse.lll'

export type BridgeResponse = {
	status(code: number): BridgeResponse
	json(payload: EndpointResponse<EndpointPath> | BridgeJsonResponse): BridgeResponse
}
