import './App.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from './lll.lll'
import { App } from './App.lll'

@Spec('Exercises the app shell through visible browser UI only.')
export class AppTest {
	testType = 'behavioral'

	@Scenario('renders the headline, explainer copy, and equalizer host')
	static async rendersAppShell(subjectFactory: SubjectFactory<App>, scenario: ScenarioParameter): Promise<{ heading: string, lead: string, childTag: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const app = await subjectFactory()
		await this.prepareMountedApp(app, waitFor)
		await waitFor(() => app.shadowRoot?.querySelector('image-equalizer') !== null, 'Expected the app shell to render the image equalizer host')

		const heading = this.readText(app, 'h1')
		const lead = this.readText(app, 'p.lead')
		const equalizer = app.shadowRoot?.querySelector('image-equalizer')
		assert(equalizer !== null && equalizer !== undefined, 'Expected image-equalizer to be visible inside the app shell')
		assert(heading === 'Interactive Frequency-Domain Image Equalizer', 'Expected the app headline to describe the equalizer experience')
		assert(lead.includes('Upload any image') && lead.includes('processed version respond live below the original'), 'Expected the lead copy to explain upload and live-processing behavior')
		return { heading, lead, childTag: equalizer.tagName.toLowerCase() }
	}

	@Spec('Waits for the app host shadow DOM to render.')
	private static async prepareMountedApp(app: App, waitFor: WaitForFn): Promise<void> {
		await waitFor(() => app.shadowRoot !== null, 'Expected app-root shadow DOM to render')
		await app.updateComplete
	}

	@Spec('Reads visible text content from one app shadow selector.')
	private static readText(app: App, selector: string): string {
		const element = app.shadowRoot?.querySelector<HTMLElement>(selector)
		if (element === null || element === undefined) {
			throw new Error(`Element not found: ${selector}`)
		}
		return element.textContent?.trim() ?? ''
	}
}
