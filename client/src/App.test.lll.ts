import './App.lll'
import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { App } from './App.lll'

@Spec('Exercises the visible app shell for the interactive image equalizer.')
@customElement('app-test-panel')
export class AppTest extends LitElement {
	testType = "behavioral"
	private static activeInstance: AppTest | null = null

	static styles = css`
		:host {
			display: block;
			padding: 8px;
		}
	`

	@Spec('Tracks the currently connected app test panel for scenario lookup.')
	connectedCallback() {
		super.connectedCallback()
		AppTest.activeInstance = this
	}

	@Spec('Clears the tracked app test panel when it disconnects.')
	disconnectedCallback() {
		if (AppTest.activeInstance === this) {
			AppTest.activeInstance = null
		}
		super.disconnectedCallback()
	}

	@Spec('Renders the visible application shell used by app scenarios.')
	render(): TemplateResult {
		return html`<div id="app-host"><app-root></app-root></div>`
	}

	@Scenario('renders the equalizer app shell and its live processed preview')
	static async rendersEqualizerShell(input = {}, assert: AssertFn): Promise<{ title: string, hasProcessedPreview: boolean }> {
		const app = await this.getRenderedApp()
		const title = app.shadowRoot?.querySelector('h1')?.textContent?.trim() ?? ''
		assert(title === 'Interactive Frequency-Domain Image Equalizer', 'Expected the new image equalizer title to be rendered')

		const equalizer = app.shadowRoot?.querySelector('image-equalizer')
		assert(equalizer instanceof HTMLElement, 'Expected image-equalizer to be rendered inside app-root')
		await this.waitFor(() => equalizer.shadowRoot?.querySelector('img.preview.processed') !== null, 4000, 40)

		const hasProcessedPreview = equalizer.shadowRoot?.querySelector('img.preview.processed') !== null
		assert(hasProcessedPreview, 'Expected the nested equalizer to show a processed preview image')
		return { title, hasProcessedPreview }
	}

	@Spec('Finds the visible app-root instance rendered by the active app test panel.')
	private static async getRenderedApp(): Promise<App> {
		await this.waitFor(() => this.findBestRenderedPanel() !== null, 1200, 20)
		const panel = this.findBestRenderedPanel()
		if (panel === null) {
			throw new Error('Expected an already-rendered app-test-panel element')
		}
		await panel.updateComplete
		const app = panel.shadowRoot?.querySelector<App>('app-root')
		if (app === null || app === undefined) {
			throw new Error('Expected app-root to be rendered inside app-test-panel')
		}
		await app.updateComplete
		return app
	}

	@Spec('Selects the best currently rendered app test panel.')
	private static findBestRenderedPanel(): AppTest | null {
		if (this.activeInstance !== null && this.activeInstance.isConnected) {
			return this.activeInstance
		}

		const panels = Array.from(document.querySelectorAll<AppTest>('app-test-panel'))
		const visiblePanel = panels.find((element) => element.isConnected && element.getClientRects().length > 0)
		if (visiblePanel !== undefined) {
			return visiblePanel
		}
		return panels.find((element) => element.isConnected) ?? null
	}

	@Spec('Polls until a visible app condition is met or the timeout elapses.')
	private static async waitFor(predicate: () => boolean, timeoutMs: number, intervalMs: number) {
		const startTime = Date.now()
		while (Date.now() - startTime < timeoutMs) {
			if (predicate()) {
				return
			}
			await new Promise<void>((resolve) => setTimeout(resolve, intervalMs))
		}
		throw new Error(`Condition was not met within ${timeoutMs}ms`)
	}
}
