import './ImageEqualizer.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from '@shared/lll.lll'
import { ImageEqualizer } from './ImageEqualizer.lll'

@Spec('Exercises the image equalizer only through visible controls and rendered output.')
export class ImageEqualizerTest {
	testType = 'behavioral'

	@Scenario('loads the scenic demo automatically and lets the user widen the selected band')
	static async loadsDemoAndUpdatesVisibleBandWidth(subjectFactory: SubjectFactory<ImageEqualizer>, scenario: ScenarioParameter): Promise<{ sourceLabel: string, processingState: string, fftSize: string, beforeReadout: string, afterReadout: string }> {
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
		const qSlider = this.readRangeInputByLabel(equalizer, 'Band 3 width Q')
		qSlider.value = '1.2'
		qSlider.dispatchEvent(new Event('input', { bubbles: true }))
		await equalizer.updateComplete
		await waitFor(() => this.readText(equalizer, '#selected-band-readout').includes('Q 1.2'), 'Expected the selected-band readout to reflect the widened Band 3 Q value')
		const afterReadout = this.readText(equalizer, '#selected-band-readout')
		await waitFor(() => this.readText(equalizer, '#band-snapshot').includes('Band 3:') && this.readText(equalizer, '#band-snapshot').includes('Q 1.2'), 'Expected the processed band snapshot to reflect the updated Band 3 width')
		const afterSnapshot = this.readText(equalizer, '#band-snapshot')
		const processedPreview = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.processed')
		const originalPreview = equalizer.shadowRoot?.querySelector<HTMLImageElement>('img.preview.original')
		const graphElement = equalizer.shadowRoot?.querySelector<HTMLElement>('equalizer-graph')
		const graphBackdrop = graphElement?.shadowRoot?.querySelector<SVGPathElement>('path[aria-label="Live FFT spectrum backdrop"]')

		assert(sourceLabel === 'Scenic image', 'Expected the built-in scenic demo to load automatically on first render')
		assert(processingState === 'Processed', 'Expected the equalizer to finish processing the scenic demo image')
		assert(fftSize === '256 × 256', 'Expected the scenic demo to resolve to a 256 × 256 FFT working size')
		assert(beforeReadout.includes('Band 3:') && beforeReadout.includes('Q 3.3'), 'Expected Band 3 to be selected by default with the neutral width value')
		assert(beforeSnapshot.includes('Band 3:') && beforeSnapshot.includes('Q 3.3'), 'Expected the visible processing summary to start from the neutral Band 3 width')
		assert(afterReadout.includes('Band 3:') && afterReadout.includes('Q 1.2'), 'Expected the selected-band readout to show the new user-selected width')
		assert(afterSnapshot.includes('Band 3:') && afterSnapshot.includes('Q 1.2'), 'Expected the processed summary text to update after the width slider changes')
		assert(originalPreview !== null && originalPreview !== undefined, 'Expected the original scenic preview image to be visible')
		assert(processedPreview !== null && processedPreview !== undefined, 'Expected the processed scenic preview image to be visible')
		assert(graphBackdrop !== null && graphBackdrop !== undefined, 'Expected the frequency graph to show the faint live FFT backdrop after processing the demo image')
		return { sourceLabel, processingState, fftSize, beforeReadout, afterReadout }
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

	@Spec('Finds one visible range input by its exact accessible label.')
	private static readRangeInputByLabel(equalizer: ImageEqualizer, label: string): HTMLInputElement {
		const input = Array.from(equalizer.shadowRoot?.querySelectorAll<HTMLInputElement>('input[type="range"]') ?? []).find((candidate) => candidate.getAttribute('aria-label') === label)
		if (input === undefined) {
			throw new Error(`Range input not found: ${label}`)
		}
		return input
	}
}
