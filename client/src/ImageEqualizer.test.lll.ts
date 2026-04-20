import './ImageEqualizer.lll'
import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { ImageEqualizer } from './ImageEqualizer.lll'

@Spec('Exercises visible equalizer behavior through the browser UI only.')
@customElement('image-equalizer-test-panel')
export class ImageEqualizerTest extends LitElement {
	testType = "behavioral"
	private static activeInstance: ImageEqualizerTest | null = null

	static styles = css`
		:host {
			display: block;
			padding: 8px;
		}
	`

	@Spec('Tracks the currently connected equalizer test panel for scenario reuse.')
	connectedCallback() {
		super.connectedCallback()
		ImageEqualizerTest.activeInstance = this
	}

	@Spec('Clears the tracked equalizer test panel when it disconnects.')
	disconnectedCallback() {
		if (ImageEqualizerTest.activeInstance === this) {
			ImageEqualizerTest.activeInstance = null
		}
		super.disconnectedCallback()
	}

	@Spec('Renders the visible image equalizer used by behavioral scenarios.')
	render(): TemplateResult {
		return html`<image-equalizer></image-equalizer>`
	}

	@Scenario('loads the demo image automatically and only enables the selected band Q slider while updates still work')
	static async loadsDemoAndUpdatesBandWidth(input = {}, assert: AssertFn): Promise<{ sourceLabel: string, selectedBandText: string }> {
		const equalizer = await this.getRenderedEqualizer()
		await this.waitFor(() => equalizer.shadowRoot?.querySelector('#source-label')?.textContent?.trim() === 'Demo image', 4000, 40)
		await this.waitFor(() => equalizer.shadowRoot?.querySelector('img.preview.processed') !== null, 4000, 40)

		const sourceLabel = equalizer.shadowRoot?.querySelector('#source-label')?.textContent?.trim() ?? ''
		assert(sourceLabel === 'Demo image', 'Expected the demo image to load by default')

		const firstQSlider = equalizer.shadowRoot?.querySelector<HTMLInputElement>('input[aria-label="Band 1 width Q"]')
		const thirdQSlider = equalizer.shadowRoot?.querySelector<HTMLInputElement>('input[aria-label="Band 3 width Q"]')
		assert(firstQSlider !== null && firstQSlider !== undefined, 'Expected the first band Q slider to be rendered')
		assert(thirdQSlider !== null && thirdQSlider !== undefined, 'Expected the initially selected band Q slider to be rendered')
		assert(firstQSlider.disabled, 'Expected a non-selected band Q slider to be disabled')
		assert(!thirdQSlider.disabled, 'Expected the selected band Q slider to remain enabled')

		const focusButton = Array.from(equalizer.shadowRoot?.querySelectorAll<HTMLButtonElement>('button.secondary') ?? []).find((button) => button.textContent?.trim() === 'Focus')
		assert(focusButton instanceof HTMLButtonElement, 'Expected a Focus button to be rendered for band cards')
		focusButton.click()
		await equalizer.updateComplete

		assert(!firstQSlider.disabled, 'Expected the focused band Q slider to become enabled')
		firstQSlider.value = '3.3'
		firstQSlider.dispatchEvent(new Event('input', { bubbles: true }))

		await this.waitFor(() => (equalizer.shadowRoot?.querySelector('#selected-band-readout')?.textContent ?? '').includes('Band 1'), 3000, 40)
		await this.waitFor(() => (equalizer.shadowRoot?.querySelector('#selected-band-readout')?.textContent ?? '').includes('Q 3.3'), 3000, 40)

		const selectedBandText = equalizer.shadowRoot?.querySelector('#selected-band-readout')?.textContent?.trim() ?? ''
		assert(selectedBandText.includes('Band 1'), 'Expected editing Band 1 to focus it in the readout')
		assert(selectedBandText.includes('Q 3.3'), 'Expected the updated Q value to appear in the readout')
		return { sourceLabel, selectedBandText }
	}

	@Scenario('updates the processed preview while a band handle is still being dragged')
	static async updatesProcessedPreviewDuringDrag(input = {}, assert: AssertFn): Promise<{ processingState: string, processedImageChanged: boolean }> {
		const equalizer = await this.getRenderedEqualizer()
		await this.waitFor(() => equalizer.shadowRoot?.querySelector('#source-label')?.textContent?.trim() === 'Demo image', 4000, 40)
		await this.waitFor(() => equalizer.shadowRoot?.querySelector('img.preview.processed') !== null, 4000, 40)

		const graph = equalizer.shadowRoot?.querySelector('equalizer-graph')
		assert(graph !== null && graph !== undefined, 'Expected the equalizer graph to be rendered')
		const graphElement = graph as HTMLElement & { updateComplete?: Promise<unknown>, shadowRoot?: ShadowRoot }
		await graphElement.updateComplete
		const svgElement = graphElement.shadowRoot?.querySelector('svg')
		const handle = graphElement.shadowRoot?.querySelector('circle')
		const shell = graphElement.shadowRoot?.querySelector('button.graph-shell')
		assert(svgElement instanceof SVGElement, 'Expected the equalizer graph SVG to render')
		assert(handle instanceof SVGCircleElement, 'Expected a draggable graph handle to render')
		assert(shell instanceof HTMLButtonElement, 'Expected the graph shell to render')
		Object.defineProperty(svgElement, 'getBoundingClientRect', {
			value: () => new DOMRect(0, 0, 760, 360),
		})

		const initialProcessedImage = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.processed')
		const initialProcessedImageUrl = initialProcessedImage?.src ?? ''
		assert(initialProcessedImageUrl.length > 0, 'Expected an initial processed preview before dragging')

		const startX = Number(handle.getAttribute('cx') ?? '140')
		const startY = Number(handle.getAttribute('cy') ?? '180')
		handle.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: startX, clientY: startY }))
		shell.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: startX + 160, clientY: Math.max(40, startY - 110) }))
		shell.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: startX + 190, clientY: Math.max(28, startY - 130) }))

		await this.waitFor(() => {
			const liveProcessedImageUrl = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.processed')?.src ?? ''
			return liveProcessedImageUrl.length > 0 && liveProcessedImageUrl !== initialProcessedImageUrl
		}, 4000, 20)

		const updatedProcessedImageUrl = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.processed')?.src ?? ''
		const processingState = equalizer.shadowRoot?.querySelector('#processing-state')?.textContent?.trim() ?? ''
		const processedImageChanged = updatedProcessedImageUrl !== initialProcessedImageUrl
		assert(processedImageChanged, 'Expected the processed preview image to update before pointer release')

		shell.dispatchEvent(new MouseEvent('pointerup', { bubbles: true, clientX: startX + 190, clientY: Math.max(28, startY - 130) }))
		return { processingState, processedImageChanged }
	}

	@Spec('Finds the visible image-equalizer instance rendered by the active test panel.')
	private static async getRenderedEqualizer(): Promise<ImageEqualizer> {
		await this.waitFor(() => this.findBestRenderedPanel() !== null, 1200, 20)
		const panel = this.findBestRenderedPanel()
		if (panel === null) {
			throw new Error('Expected an already-rendered image-equalizer-test-panel element')
		}
		await panel.updateComplete
		const equalizer = panel.shadowRoot?.querySelector<ImageEqualizer>('image-equalizer')
		if (equalizer === null || equalizer === undefined) {
			throw new Error('Expected image-equalizer to be rendered inside image-equalizer-test-panel')
		}
		await equalizer.updateComplete
		return equalizer
	}

	@Spec('Selects the best currently rendered image equalizer test panel.')
	private static findBestRenderedPanel(): ImageEqualizerTest | null {
		if (this.activeInstance !== null && this.activeInstance.isConnected) {
			return this.activeInstance
		}

		const panels = Array.from(document.querySelectorAll<ImageEqualizerTest>('image-equalizer-test-panel'))
		const visiblePanel = panels.find((element) => element.isConnected && element.getClientRects().length > 0)
		if (visiblePanel !== undefined) {
			return visiblePanel
		}
		return panels.find((element) => element.isConnected) ?? null
	}

	@Spec('Polls until the equalizer UI reaches the expected visible state or timeout occurs.')
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
