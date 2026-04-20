import './Schemas.lll'
import { AssertFn, Scenario, Spec, WaitForFn, ScenarioParameter } from '../lll.lll'
import { Schemas } from './Schemas.lll'

@Spec('Covers shared request and response schemas.')
export class SchemasTest {
	testType = 'unit'

	@Scenario('Hello and Multiply schemas accept valid payloads')
	static async helloAndMultiplySchemasAcceptValidPayloads(scenario: ScenarioParameter): Promise<{ helloName: string, product: number }> {
		const input = scenario.input
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const helloResult = Schemas.HelloRequest.safeParse({ name: 'Grace' })
		const multiplyResult = Schemas.MultiplyRequest.safeParse({ a: 8, b: 9 })

		assert(helloResult.success, 'Expected HelloRequest to accept a non-empty name')
		assert(multiplyResult.success, 'Expected MultiplyRequest to accept numeric operands')
		assert(Schemas.HelloResponse.parse('Hello, Grace!') === 'Hello, Grace!', 'Expected HelloResponse to accept string payloads')
		assert(Schemas.MultiplyResponse.parse({ product: 72 }).product === 72, 'Expected MultiplyResponse to accept a numeric product')

		return {
			helloName: helloResult.data.name,
			product: multiplyResult.data.a * multiplyResult.data.b
		}
	}
}
