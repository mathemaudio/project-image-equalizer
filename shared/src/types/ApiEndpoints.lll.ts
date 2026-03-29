import type { Schemas } from './Schemas.lll'
import { Spec } from '../lll.lll'

Spec('Defines the shared API endpoint contract map with request/response/schema types.')
export type ApiEndpoints = {
	'/api/hello': {
		method: 'POST'
		request: { name: string }
		response: string
		requestSchema: typeof Schemas.HelloRequest
	}
	'/api/multiply': {
		method: 'POST'
		request: { a: number; b: number }
		response: { product: number }
		requestSchema: typeof Schemas.MultiplyRequest
	}
}
