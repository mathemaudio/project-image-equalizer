import type { EndpointPath, EndpointRequest, EndpointResponse } from '..'
import type { BridgeRequest } from '../BridgeRequest.lll'
import type { BridgeResponse } from '../BridgeResponse.lll'

export type TypedEndpointHandler<Path extends EndpointPath> = (
	request: EndpointRequest<Path>,
	req: BridgeRequest,
	res: BridgeResponse
) => Promise<EndpointResponse<Path>> | EndpointResponse<Path>
