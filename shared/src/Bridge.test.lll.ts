import './Bridge.lll'
import { AssertFn, Scenario, Spec, WaitForFn, ScenarioParameter } from './lll.lll'
import { Bridge } from './Bridge.lll'
import type { BridgeApp } from './BridgeApp.lll'
import type { BridgeRequest } from './BridgeRequest.lll'
import type { BridgeResponse } from './BridgeResponse.lll'
import { Schemas } from './types/Schemas.lll'

@Spec('Covers Bridge endpoint registration and typed fetch behavior.')
export class BridgeTest {
	testType = 'unit'

	@Scenario('registers typed endpoint and returns validated handler output')
	static async registersTypedEndpointAndReturnsValidatedHandlerOutput(scenario: ScenarioParameter): Promise<{ statusCode: number, payload: string, registeredPath: string }> {
		const input = scenario.input
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		let registeredPath = ''
		let registeredHandler:
			| ((req: BridgeRequest, res: BridgeResponse) => Promise<BridgeResponse | void> | BridgeResponse | void)
			| undefined

		const app: BridgeApp = {
			post(path, handler) {
				registeredPath = path
				registeredHandler = handler
			}
		}

		Bridge.typedEndpoint(app, '/api/hello', Schemas.HelloRequest, ({ name }) => `Hello, ${name}!`)
		assert(registeredHandler !== undefined, 'Expected Bridge to register a POST handler')

		let statusCode = 200
		let payload = ''
		const response: BridgeResponse = {
			status(code: number) {
				statusCode = code
				return this
			},
			json(value) {
				if (typeof value === 'string') {
					payload = value
				}
				return this
			}
		}

		await registeredHandler({ body: { name: 'Ada' } }, response)

		assert(registeredPath === '/api/hello', 'Expected typed endpoint to keep the registered path')
		assert(statusCode === 200, 'Expected successful validation to keep the default status code')
		assert(payload === 'Hello, Ada!', 'Expected handler result to be forwarded to res.json')
		return { statusCode, payload, registeredPath }
	}

	@Scenario('typedFetch forwards JSON request and parses JSON response')
	static async typedFetchForwardsJsonRequestAndParsesResponse(scenario: ScenarioParameter): Promise<{ method: string, body: string, response: { product: number } }> {
		const input = scenario.input
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		let method = ''
		let body = ''

		const response = await Bridge.typedFetch('/api/multiply', { a: 6, b: 7 }, {
			baseUrl: 'https://example.test',
			fetchImpl: async (url, init) => {
				assert(url === 'https://example.test/api/multiply', 'Expected typedFetch to compose the full request URL')
				method = init?.method ?? ''
				body = typeof init?.body === 'string' ? init.body : ''

				return {
					ok: true,
					status: 200,
					statusText: 'OK',
					headers: {
						get(name: string) {
							return name.toLowerCase() === 'content-type' ? 'application/json; charset=utf-8' : null
						}
					},
					json: async () => ({ product: 42 }),
					text: async () => '{"product":42}'
				}
			}
		})

		assert(method === 'POST', 'Expected typedFetch to default to POST requests')
		assert(body === JSON.stringify({ a: 6, b: 7 }), 'Expected typedFetch to serialize the request body as JSON')
		assert(response.product === 42, 'Expected typedFetch to parse the JSON response')
		return { method, body, response }
	}
}
