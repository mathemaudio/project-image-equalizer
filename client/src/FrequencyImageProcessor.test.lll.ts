import './FrequencyImageProcessor.lll'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { DemoImageFactory } from './DemoImageFactory.lll'
import type { EqualizerBand } from './EqualizerBand.lll'
import { FrequencyImageProcessor } from './FrequencyImageProcessor.lll'

@Spec('Covers FFT-domain image shaping outputs and summaries for the equalizer processor.')
export class FrequencyImageProcessorTest {
	testType = "unit"

	@Scenario('processes an image in the FFT domain and changes the output when band gains change')
	static async shapesImageSpectra(input = {}, assert: AssertFn): Promise<{ neutralSize: string, shapedRange: string }> {
		const demo = DemoImageFactory.createDataUrl(64)
		const image = await this.loadImage(demo.dataUrl)
		const neutralBands: EqualizerBand[] = [
			{ id: 1, label: 'Band 1', color: '#82e8ff', center: 0.18, gain: 0, q: 1.3 },
		]
		const shapedBands: EqualizerBand[] = [
			{ id: 1, label: 'Band 1', color: '#82e8ff', center: 0.18, gain: 10, q: 2.4 },
			{ id: 2, label: 'Band 2', color: '#ff8f71', center: 0.62, gain: -7, q: 1.1 },
		]

		const neutral = await FrequencyImageProcessor.process(image, neutralBands, 64, 'Demo image')
		const shaped = await FrequencyImageProcessor.process(image, shapedBands, 64, 'Demo image')
		assert(neutral.dataUrl.startsWith('data:image/png'), 'Expected neutral processing to return a PNG data URL')
		assert(shaped.dataUrl.startsWith('data:image/png'), 'Expected shaped processing to return a PNG data URL')
		assert(neutral.summary.workingWidth === 64 && neutral.summary.workingHeight === 64, 'Expected the FFT working size to be 64 by 64')
		assert(shaped.summary.gainExtremesText !== '1.00× to 1.00×', 'Expected non-neutral bands to create a non-flat gain range')
		assert(shaped.summary.bandSnapshotText.includes('Band 2'), 'Expected the band summary text to include the second shaped band')
		assert(shaped.dataUrl !== neutral.dataUrl, 'Expected shaped processing to visibly differ from neutral processing')
		return {
			neutralSize: `${neutral.summary.workingWidth}x${neutral.summary.workingHeight}`,
			shapedRange: shaped.summary.gainExtremesText,
		}
	}

	@Spec('Loads a browser image element from a generated demo data URL for processor assertions.')
	private static loadImage(sourceUrl: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve, reject) => {
			const image = new Image()
			image.onload = () => resolve(image)
			image.onerror = () => reject(new Error('Expected demo image to load successfully for FFT processing'))
			image.src = sourceUrl
		})
	}
}
