import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Spec } from '@shared/lll.lll'

@Spec('Provides a small SQLite-backed store for hello endpoint greeting logs.')
export class GreetingLogDatabase {
	private readonly database: Database.Database

	constructor(databasePath = GreetingLogDatabase.resolveDatabasePath()) {
		Spec('Creates the greeting log table when the database file is first used.')
		this.database = new Database(databasePath)
		this.database.exec(`
			CREATE TABLE IF NOT EXISTS greeting_test_logs (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				greeted_name TEXT NOT NULL
			)
		`)
	}

	@Spec('Stores the greeted name that was submitted to the hello endpoint.')
	logGreetingRequest(greetedName: string): number {
		const statement = this.database.prepare(`
			INSERT INTO greeting_test_logs (greeted_name)
			VALUES (?)
		`)
		const result = statement.run(greetedName) as {
			lastInsertRowid: number | bigint
		}
		return Number(result.lastInsertRowid)
	}

	@Spec('Closes the underlying SQLite connection when the caller is done with it.')
	close() {
		this.database.close()
	}

	@Spec('Resolves the shared server-side SQLite file path and ensures its directory exists.')
	private static resolveDatabasePath(): string {
		const currentFilePath = fileURLToPath(import.meta.url)
		const databasePath = resolve(dirname(currentFilePath), '../data/database.db')
		mkdirSync(dirname(databasePath), { recursive: true })
		return databasePath
	}
}
