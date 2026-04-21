import './FrequencyImageProcessor.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec } from '@shared/lll.lll'
import { DemoImageFactory } from './DemoImageFactory.lll'
import type { EqualizerBand } from './EqualizerBand.lll'
import { FrequencyImageProcessor } from './FrequencyImageProcessor.lll'

@Spec('Covers FFT-domain image shaping outputs and summaries for the equalizer processor.')
export class FrequencyImageProcessorTest {
	testType = 'unit'

	@Scenario('processes an image in the FFT domain and changes the output when band gains change')
	static async shapesImageSpectra(scenario: ScenarioParameter): Promise<{ neutralSize: string, shapedRange: string, windowedProfileDistance: string }> {
		const assert: AssertFn = scenario.assert
		const demo = DemoImageFactory.createAbstractDataUrl(64)
		const scenicDemo = DemoImageFactory.createScenicDataUrl(64)
		const image = await this.loadImage(demo.dataUrl)
		const scenicImage = await this.loadImage(scenicDemo.dataUrl)
		const neutralBands: EqualizerBand[] = [
			{ id: 1, label: 'Band 1', color: '#82e8ff', center: 0.18, gain: 0, q: 1.3 },
		]
		const shapedBands: EqualizerBand[] = [
			{ id: 1, label: 'Band 1', color: '#82e8ff', center: 0.18, gain: 10, q: 2.4 },
			{ id: 2, label: 'Band 2', color: '#ff8f71', center: 0.62, gain: -7, q: 1.1 },
		]

		const neutral = await FrequencyImageProcessor.process(image, neutralBands, 64, 'Demo image')
		const scenic = await FrequencyImageProcessor.process(scenicImage, neutralBands, 64, 'Scenic image')
		const shaped = await FrequencyImageProcessor.process(image, shapedBands, 64, 'Demo image')
		const windowedProfileDistance = this.calculateProfileDistance(neutral.summary.spectrogramProfile, scenic.summary.spectrogramProfile)
		assert(neutral.dataUrl.startsWith('data:image/png'), 'Expected neutral processing to return a PNG data URL')
		assert(shaped.dataUrl.startsWith('data:image/png'), 'Expected shaped processing to return a PNG data URL')
		assert(neutral.summary.workingWidth === 64 && neutral.summary.workingHeight === 64, 'Expected the FFT working size to be 64 by 64')
		assert(neutral.summary.spectrogramProfile.length === 96, 'Expected neutral processing to publish a dense 96-sample FFT profile for the graph backdrop')
		assert(shaped.summary.gainExtremesText !== '1.00× to 1.00×', 'Expected non-neutral bands to create a non-flat gain range')
		assert(shaped.summary.bandSnapshotText.includes('Band 2'), 'Expected the band summary text to include the second shaped band')
		assert(shaped.summary.spectrogramProfile.some((value) => value > 0.2), 'Expected the shaped FFT summary to include visible normalized spectral peaks')
		assert(shaped.summary.spectrogramProfile.every((value) => value >= 0 && value <= 1), 'Expected the graph backdrop profile to stay auto-normalized between zero and one')
		assert(windowedProfileDistance > 0.005, 'Expected very different demo images to produce more distinguishable visual FFT backdrops after edge windowing')
		assert(shaped.dataUrl !== neutral.dataUrl, 'Expected shaped processing to visibly differ from neutral processing')
		return {
			neutralSize: `${neutral.summary.workingWidth}x${neutral.summary.workingHeight}`,
			shapedRange: shaped.summary.gainExtremesText,
			windowedProfileDistance: windowedProfileDistance.toFixed(3),
		}
	}

	@Spec('Measures how different two normalized graph spectrum profiles appear across all buckets.')
	private static calculateProfileDistance(left: number[], right: number[]): number {
		const sampleCount = Math.min(left.length, right.length)
		if (sampleCount === 0) {
			return 0
		}
		let totalDifference = 0
		for (let index = 0; index < sampleCount; index += 1) {
			totalDifference += Math.abs(left[index] - right[index])
		}
		return totalDifference / sampleCount
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
