import { TypedEndpointHandler } from './types/TypedEndpointHandler.lll'
import { TypedFetchOptions } from './types/TypedFetchOptions.lll'
import { Spec } from './lll.lll'
import type { EndpointMethod } from './types/EndpointMethod.lll'
import type { EndpointPath } from './types/EndpointPath.lll'
import type { EndpointRequest } from './types/EndpointRequest.lll'
import type { EndpointRequestSchema } from './types/EndpointRequestSchema.lll'
import type { EndpointResponse } from './types/EndpointResponse.lll'
import type { BridgeApp } from './BridgeApp.lll'
import type { BridgeJsonResponse } from './BridgeJsonResponse.lll'
import type { BridgeRequest } from './BridgeRequest.lll'
import type { BridgeResponse } from './BridgeResponse.lll'
import type { FetchLike } from './types/FetchLike.lll'

@Spec('Provides typed server endpoint wiring and client fetch helpers for shared API contracts.')
export class Bridge {
	@Spec('Returns the globally available fetch implementation when present.')
	private static resolveFetchImplementation(): FetchLike | undefined {
		const maybeGlobal = globalThis as Record<string, unknown>
		const maybeFetch = maybeGlobal['fetch']
		return typeof maybeFetch === 'function' ? (maybeFetch as FetchLike) : undefined
	}

	@Spec('Writes endpoint errors to the global console when an error logger is available.')
	private static logEndpointError(path: EndpointPath, error: unknown) {
		const maybeGlobal = globalThis as Record<string, unknown>
		const maybeConsole = maybeGlobal['console']
		if (typeof maybeConsole !== 'object' || maybeConsole === null) {
			return
		}

		const maybeErrorLogger = (maybeConsole as Record<string, unknown>)['error']
		if (typeof maybeErrorLogger === 'function') {
			maybeErrorLogger(`Error in ${path}:`, error)
		}
	}

	@Spec('Registers a typed endpoint handler with schema validation and standardized error responses.')
	static typedEndpoint<Path extends EndpointPath>(
		app: BridgeApp,
		path: Path,
		schema: EndpointRequestSchema<Path>,
		handler: TypedEndpointHandler<Path>
	) {
		app.post(path, async (req: BridgeRequest, res: BridgeResponse) => {
			try {
				const validationResult = schema.safeParse(req.body)

				if (!validationResult.success) {
					const payload: BridgeJsonResponse = {
						error: 'Invalid request body',
						details: validationResult.error.issues.map((issue) => ({
							path: issue.path.join('.'),
							message: issue.message,
							code: issue.code
						}))
					}
					return res.status(400).json(payload)
				}

				const typedRequest = validationResult.data as EndpointRequest<Path>
				const result = await handler(typedRequest, req, res)
				res.json(result)
			} catch (error) {
				Bridge.logEndpointError(path, error)
				const payload: BridgeJsonResponse = {
					error: 'Internal server error',
					details: error instanceof Error ? error.message : 'Unknown error'
				}
				res.status(500).json(payload)
			}
		})
	}

	@Spec('Performs a typed HTTP request and returns a JSON response mapped to the endpoint contract.')
	static async typedFetch<Path extends EndpointPath>(
		path: Path,
		request: EndpointRequest<Path>,
		options: TypedFetchOptions<Path> = {}
	): Promise<EndpointResponse<Path>> {
		const fetchImpl = options.fetchImpl ?? Bridge.resolveFetchImplementation()
		if (!fetchImpl) {
			throw new Error('A fetch implementation is required for typedFetch')
		}

		const method = options.method ?? ('POST' as EndpointMethod<Path>)
		const methodString = method as string
		const response = await fetchImpl(`${options.baseUrl ?? ''}${path}`, {
			method: methodString,
			headers: {
				'Content-Type': 'application/json',
				...(options.headers ?? {})
			},
			body: methodString === 'GET' ? undefined : JSON.stringify(request),
			signal: options.signal,
			credentials: options.credentials
		})

		const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
		if (!contentType.includes('application/json')) {
			const bodyText = await response.text().catch(() => '')
			const hasBodyText = bodyText !== ''
			throw new Error(
				`Expected JSON response from ${path} (status ${response.status}). ${hasBodyText ? `Body: ${bodyText}` : 'Response body was empty.'}`
			)
		}

		return (await response.json()) as EndpointResponse<Path>
	}
}
