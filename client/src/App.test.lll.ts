import './App.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from './lll.lll'
import { App } from './App.lll'

@Spec('Exercises the app shell through visible browser UI only.')
export class AppTest {
	testType = 'behavioral'

	@Scenario('renders the headline, explainer copy, LLL corner link, and equalizer host')
	static async rendersAppShell(subjectFactory: SubjectFactory<App>, scenario: ScenarioParameter): Promise<{ heading: string, lead: string, childTag: string, cornerText: string, cornerHref: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const app = await subjectFactory()
		await this.prepareMountedApp(app, waitFor)
		await waitFor(() => app.shadowRoot?.querySelector('image-equalizer') !== null, 'Expected the app shell to render the image equalizer host')

		const heading = this.readText(app, 'h1')
		const lead = this.readText(app, 'p.lead')
		const equalizer = app.shadowRoot?.querySelector('image-equalizer')
		const cornerLink = app.shadowRoot?.querySelector<HTMLAnchorElement>('a.lll-corner-link')
		const cornerText = this.readText(app, '.lll-corner-link-text')
		assert(equalizer !== null && equalizer !== undefined, 'Expected image-equalizer to be visible inside the app shell')
		assert(cornerLink !== null && cornerLink !== undefined, 'Expected the app shell to render the copied LLL corner link')
		assert(heading === 'Interactive Frequency-Domain Image Equalizer', 'Expected the app headline to describe the equalizer experience')
		assert(lead.includes('Upload any image') && lead.includes('processed version respond live below the original'), 'Expected the lead copy to explain upload and live-processing behavior')
		assert(cornerText === 'made with LLL', 'Expected the corner badge text to match the reference project wording')
		assert(cornerLink.href === 'https://evidype.com/', 'Expected the corner badge to link to the Evidype website')
		return { heading, lead, childTag: equalizer.tagName.toLowerCase(), cornerText, cornerHref: cornerLink.href }
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
