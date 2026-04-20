import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { AssertFn, Scenario, Spec, WaitForFn, ScenarioParameter } from '@shared/lll.lll'
import { GreetingLogDatabase } from './GreetingLogDatabase.lll'
import { Playground } from './Playground.lll'

@Spec('Covers server router wiring behavior for Playground.')
export class PlaygroundTest {
	testType = "unit"

	@Scenario('registers hello and multiply API routes')
	static async registersTypedEndpoints(scenario: ScenarioParameter): Promise<{ registeredPaths: string[] }> {
		const input = scenario.input
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const router = Playground.createApiPlaygroundRouter()
		const stack = (router as unknown as { stack?: Array<{ route?: { path?: string } }> }).stack ?? []
		const registeredPaths = stack
			.map((layer) => layer.route?.path)
			.filter((path): path is string => typeof path === 'string')

		assert(registeredPaths.includes('/api/hello'), 'Expected /api/hello route to be registered')
		assert(registeredPaths.includes('/api/multiply'), 'Expected /api/multiply route to be registered')
		return { registeredPaths }
	}

	@Scenario('stores greeted names in the default SQLite schema')
	static async storesGreetingLogEntries(scenario: ScenarioParameter): Promise<{ storedId: number; storedName: string }> {
		const input = scenario.input
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const tempDirectory = mkdtempSync(join(tmpdir(), 'greeting-log-db-'))
		const databasePath = join(tempDirectory, 'database.db')
		const greetingLogDatabase = new GreetingLogDatabase(databasePath)

		try {
			const storedId = greetingLogDatabase.logGreetingRequest('Frank Zappa')
			greetingLogDatabase.close()

			const database = new Database(databasePath, { readonly: true })
			try {
				const row = database
					.prepare('SELECT id, greeted_name FROM greeting_test_logs WHERE id = ?')
					.get(storedId) as { id: number; greeted_name: string } | undefined
				assert(row !== undefined, 'Expected greeting_test_logs row to be inserted')
				assert(row.id === storedId, 'Expected stored row id to match insert result')
				assert(row.greeted_name === 'Frank Zappa', 'Expected stored greeted name to match inserted request')
				return { storedId, storedName: row.greeted_name }
			} finally {
				database.close()
			}
		} finally {
			rmSync(tempDirectory, { recursive: true, force: true })
		}
	}
}
