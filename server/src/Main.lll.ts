import { fileURLToPath } from 'node:url'
import express from 'express'
import { Spec } from '@shared/lll.lll'
import { Playground } from './Playground.lll'

@Spec('Bootstraps and starts the Express API server.')
export class Main {
	private readonly app = express()
	private readonly port = Number(process.env.PORT)

	constructor() {
		Spec('Initializes middleware, routes, and starts listening on the configured port.')
		this.configureMiddleware()
		this.configureRoutes()
		this.app.listen(this.port, () => {
			console.log(`✌️API listening on http://localhost:${this.port}`)
		})
	}

	@Spec('Configures middleware used by the API server.')
	private configureMiddleware() {
		this.app.use(express.json())
	}

	@Spec('Configures API and health routes.')
	private configureRoutes() {
		this.app.use(Playground.createApiPlaygroundRouter())
		this.app.get('/health', (_req, res) => {
			res.json({ ok: true })
		})
	}


}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]) {
	new Main()
}
