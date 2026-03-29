import type { EndpointPath } from './types/EndpointPath.lll'
import type { BridgeRequest } from './BridgeRequest.lll'
import type { BridgeResponse } from './BridgeResponse.lll'

export type BridgeApp = {
	post(
		path: EndpointPath,
		handler: (req: BridgeRequest, res: BridgeResponse) => Promise<BridgeResponse | void> | BridgeResponse | void
	): void
}
