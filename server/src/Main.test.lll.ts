import express from 'express'
import { AssertFn, Scenario, Spec, WaitForFn, ScenarioParameter, SubjectFactory } from '@shared/lll.lll'
import { Main } from './Main.lll'

@Spec('Covers server bootstrap behavior for Main.')
export class MainTest {
	testType = "unit"

	@Scenario('starts listening on configured PORT during bootstrap')
	static async startsListeningOnConfiguredPort(subjectFactory: SubjectFactory<unknown>, scenario: ScenarioParameter): Promise<{ listenedPort: number, callbackInvoked: boolean }> {
		const input = scenario.input
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const application = express.application as typeof express.application & {
			listen: typeof express.application.listen
		}
		const originalListen = application.listen
		const originalPort = process.env.PORT
		let listenedPort = 0
		let callbackInvoked: boolean = false

		application.listen = ((...args: unknown[]) => {
			const port = args[0]
			if (typeof port === 'number' || typeof port === 'string') {
				listenedPort = Number(port)
			}
			const callback = args.find((arg): arg is () => void => typeof arg === 'function')
			if (callback !== undefined) {
				callback()
				callbackInvoked = true
			}
			return application as unknown as ReturnType<typeof express.application.listen>
		}) as typeof express.application.listen
		process.env.PORT = '43979'

		try {
			new Main()
		} finally {
			application.listen = originalListen
			if (originalPort === undefined) {
				delete process.env.PORT
			} else {
				process.env.PORT = originalPort
			}
		}

		assert(listenedPort === 43979, 'Expected Main to listen on the configured PORT')
		assert(callbackInvoked, 'Expected Main to invoke the listen callback')
		return { listenedPort, callbackInvoked }
	}
}
