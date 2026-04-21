import './ImageEqualizer.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from '@shared/lll.lll'
import { ImageEqualizer } from './ImageEqualizer.lll'

@Spec('Exercises the image equalizer only through visible controls and rendered output.')
export class ImageEqualizerTest {
	testType = 'behavioral'

	@Scenario('loads the scenic demo automatically and lets the user boost the selected band and updates the live spectrum backdrop')
	static async loadsDemoAndUpdatesVisibleBandWidth(subjectFactory: SubjectFactory<ImageEqualizer>, scenario: ScenarioParameter): Promise<{ sourceLabel: string, processingState: string, fftSize: string, beforeReadout: string, afterReadout: string, backdropChanged: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const equalizer = await subjectFactory()
		await this.prepareMountedEqualizer(equalizer, waitFor)
		await this.waitForProcessedDemo(equalizer, waitFor)

		const sourceLabel = this.readText(equalizer, '#source-label')
		const processingState = this.readText(equalizer, '#processing-state')
		const fftSize = this.readText(equalizer, '#fft-size')
		const beforeReadout = this.readText(equalizer, '#selected-band-readout')
		const beforeSnapshot = this.readText(equalizer, '#band-snapshot')
		const graphElement = equalizer.shadowRoot?.querySelector<HTMLElement>('equalizer-graph')
		const graphBackdrop = graphElement?.shadowRoot?.querySelector<SVGPathElement>('path[aria-label="Live FFT spectrum backdrop"]')
		const beforeBackdropPath = graphBackdrop?.getAttribute('d') ?? ''
		this.dragSelectedBandGainUp(graphElement)
		await equalizer.updateComplete
		await waitFor(() => this.readText(equalizer, '#selected-band-readout').includes('+'), 'Expected the selected-band readout to reflect the boosted Band 3 gain value')
		const afterReadout = this.readText(equalizer, '#selected-band-readout')
		await waitFor(() => this.readText(equalizer, '#band-snapshot').includes('Band 3:') && this.readText(equalizer, '#band-snapshot').includes('+'), 'Expected the processed band snapshot to reflect the boosted Band 3 gain value')
		const afterSnapshot = this.readText(equalizer, '#band-snapshot')
		await waitFor(() => {
			const currentBackdrop = graphElement?.shadowRoot?.querySelector<SVGPathElement>('path[aria-label="Live FFT spectrum backdrop"]')
			return (currentBackdrop?.getAttribute('d') ?? '') !== beforeBackdropPath
		}, 'Expected the visible FFT backdrop path to update after the user boosts a band on the graph')
		const afterBackdropPath = graphElement?.shadowRoot?.querySelector<SVGPathElement>('path[aria-label="Live FFT spectrum backdrop"]')?.getAttribute('d') ?? ''
		const processedPreview = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.processed')
		const originalPreview = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.original')

		assert(sourceLabel === 'Scenic image', 'Expected the built-in scenic demo to load automatically on first render')
		assert(processingState === 'Processed', 'Expected the equalizer to finish processing the scenic demo image')
		assert(fftSize === '256 × 256', 'Expected the scenic demo to resolve to a 256 × 256 FFT working size')
		assert(beforeReadout.includes('Band 3:') && beforeReadout.includes('0.0 dB') && beforeReadout.includes('Q 3.3'), 'Expected Band 3 to be selected by default with neutral gain and width values')
		assert(beforeSnapshot.includes('Band 3:') && beforeSnapshot.includes('0.0 dB') && beforeSnapshot.includes('Q 3.3'), 'Expected the visible processing summary to start from neutral Band 3 settings')
		assert(afterReadout.includes('Band 3:') && afterReadout.includes('+') && !afterReadout.includes('0.0 dB'), 'Expected the selected-band readout to show the new boosted gain')
		assert(afterSnapshot.includes('Band 3:') && afterSnapshot.includes('+') && afterSnapshot !== beforeSnapshot, 'Expected the processed summary text to update after the gain change')
		assert(originalPreview !== null && originalPreview !== undefined, 'Expected the original scenic preview image to be visible')
		assert(processedPreview !== null && processedPreview !== undefined, 'Expected the processed scenic preview image to be visible')
		assert(graphBackdrop !== null && graphBackdrop !== undefined, 'Expected the frequency graph to show the faint live FFT backdrop after processing the demo image')
		assert(afterBackdropPath !== beforeBackdropPath, 'Expected the graph backdrop path to visibly change after the user boosted the equalizer band')
		return { sourceLabel, processingState, fftSize, beforeReadout, afterReadout, backdropChanged: String(afterBackdropPath !== beforeBackdropPath) }
	}

	@Spec('Waits for the equalizer host shadow DOM to render.')
	private static async prepareMountedEqualizer(equalizer: ImageEqualizer, waitFor: WaitForFn): Promise<void> {
		await waitFor(() => equalizer.shadowRoot !== null, 'Expected image-equalizer shadow DOM to render')
		await equalizer.updateComplete
	}

	@Spec('Waits for the automatic scenic demo load to finish and expose processed summary details.')
	private static async waitForProcessedDemo(equalizer: ImageEqualizer, waitFor: WaitForFn): Promise<void> {
		await waitFor(() => this.readText(equalizer, '#source-label') === 'Scenic image', 'Expected the scenic demo source label to appear after first render')
		await waitFor(() => this.readText(equalizer, '#processing-state') === 'Processed', 'Expected the scenic demo processing pass to complete')
		await waitFor(() => equalizer.shadowRoot?.querySelector('img.preview.original') !== null, 'Expected the original scenic preview image to render')
		await waitFor(() => equalizer.shadowRoot?.querySelector('img.preview.processed') !== null, 'Expected the processed scenic preview image to render')
		await waitFor(() => equalizer.shadowRoot?.querySelector('#fft-size') !== null, 'Expected FFT summary details to render after processing completes')
	}

	@Spec('Reads visible text content from one equalizer shadow selector.')
	private static readText(equalizer: ImageEqualizer, selector: string): string {
		const element = equalizer.shadowRoot?.querySelector<HTMLElement>(selector)
		if (element === null || element === undefined) {
			throw new Error(`Element not found: ${selector}`)
		}
		return element.textContent?.trim() ?? ''
	}

	@Spec('Drags the selected graph band upward using only visible SVG controls so processing and the live spectrum backdrop both update.')
	private static dragSelectedBandGainUp(graphElement: HTMLElement | null | undefined) {
		if (graphElement === null || graphElement === undefined) {
			throw new Error('Equalizer graph element not found')
		}
		const graphRoot = graphElement.shadowRoot
		const svgElement = graphRoot?.querySelector<SVGSVGElement>('svg')
		const handle = Array.from(graphRoot?.querySelectorAll<SVGCircleElement>('circle') ?? []).find((candidate) => candidate.getAttribute('r') === '11')
		if (svgElement === null || svgElement === undefined || handle === undefined) {
			throw new Error('Expected the selected graph handle to be visible before dragging')
		}
		const viewBox = svgElement.viewBox.baseVal
		const width = viewBox.width
		const height = viewBox.height
		Object.defineProperty(svgElement, 'getBoundingClientRect', {
			configurable: true,
			value: () => ({
				left: 0,
				top: 0,
				width,
				height,
				right: width,
				bottom: height,
				x: 0,
				y: 0,
				toJSON: () => '',
			}),
		})
		const startX = Number(handle.getAttribute('cx') ?? '0')
		const startY = Number(handle.getAttribute('cy') ?? '0')
		const endY = Math.max(24, startY - 96)
		handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true, clientX: startX, clientY: startY, pointerId: 1 }))
		const shell = graphRoot?.querySelector<HTMLElement>('button.graph-shell')
		if (shell === null || shell === undefined) {
			throw new Error('Graph drag surface not found')
		}
		shell.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, composed: true, clientX: startX, clientY: endY, pointerId: 1 }))
		shell.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true, clientX: startX, clientY: endY, pointerId: 1 }))
	}
}
