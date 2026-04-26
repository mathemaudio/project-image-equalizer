import './Start.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from './lll.lll'
import { Start } from './Start.lll'

@Spec('Covers client bootstrapping behavior through visible DOM output.')
export class StartTest {
	testType = 'behavioral'

	@Scenario('renders app-root into the app container when bootstrapped')
	static async rendersAppIntoContainer(subjectFactory: SubjectFactory<Start>, scenario: ScenarioParameter): Promise<{ renderedTagName: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const originalHTMLElement = (globalThis as Record<string, unknown>)['HTMLElement']
			; (globalThis as Record<string, unknown>)['HTMLElement'] = this.createBehavioralHTMLElementConstructor()
		try {
			const root = document.querySelector<HTMLElement>('#app')
			assert(root !== null, 'Expected the #app container to exist for client bootstrapping')

			const start = await subjectFactory()
			assert(start instanceof Start, 'Expected subjectFactory to return a Start instance')
			await waitFor(() => root.querySelector('app-root') !== null, 'Expected Start to render app-root into #app')
			const renderedElement = root.querySelector('app-root')
			assert(renderedElement !== null, 'Expected a visible app-root element inside #app after bootstrapping')
			return { renderedTagName: renderedElement.tagName.toLowerCase() }
		} finally {
			if (originalHTMLElement === undefined) {
				delete (globalThis as Record<string, unknown>)['HTMLElement']
			} else {
				(globalThis as Record<string, unknown>)['HTMLElement'] = originalHTMLElement
			}
		}
	}

	@Spec('Creates a minimal HTMLElement constructor so behavioral bootstrapping can render custom elements in headless runs.')
	private static createBehavioralHTMLElementConstructor(): new () => HTMLElement {
		return class {
		} as unknown as new () => HTMLElement
	}
}
