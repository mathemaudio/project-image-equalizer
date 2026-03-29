import { Router } from 'express'
import { Bridge } from '@shared/Bridge.lll'
import { Spec } from '@shared/lll.lll'
import { Schemas } from '@shared/types/Schemas.lll'
import { GreetingLogDatabase } from './GreetingLogDatabase.lll'

@Spec('Builds the API playground router with typed endpoints.')
export class Playground {
	private static readonly greetingLogDatabase = new GreetingLogDatabase()

	@Spec('Creates and configures the express router for API playground endpoints.')
	static createApiPlaygroundRouter(): Router {
		const router = Router()

		Bridge.typedEndpoint(router, '/api/hello', Schemas.HelloRequest, async (request) => {
			Playground.greetingLogDatabase.logGreetingRequest(request.name)
			return `Hi, ${request.name}!`
		})

		Bridge.typedEndpoint(router, '/api/multiply', Schemas.MultiplyRequest, async ({ a, b }) => {
			return { product: a * b }
		})

		return router
	}
}
