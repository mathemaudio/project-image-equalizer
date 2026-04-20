import './DemoImageFactory.lll'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { DemoImageFactory } from './DemoImageFactory.lll'

@Spec('Covers generated demo image creation for the equalizer startup workflow.')
export class DemoImageFactoryTest {
	testType = "unit"

	@Scenario('creates a colorful demo image data URL that loads at the requested size')
	static async createsDemoImage(input = {}, assert: AssertFn): Promise<{ prefix: string, width: number, height: number }> {
		const demo = DemoImageFactory.createAbstractDataUrl(64)
		assert(demo.dataUrl.startsWith('data:image/png'), 'Expected a PNG data URL to be produced')
		assert(demo.width === 64 && demo.height === 64, 'Expected requested demo dimensions to be preserved')

		const image = await this.loadImage(demo.dataUrl)
		assert(image.naturalWidth === 64, 'Expected generated demo image width to load as 64')
		assert(image.naturalHeight === 64, 'Expected generated demo image height to load as 64')
		return { prefix: demo.dataUrl.slice(0, 14), width: image.naturalWidth, height: image.naturalHeight }
	}

	@Spec('Loads a browser image element from a data URL for image-factory assertions.')
	private static loadImage(sourceUrl: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve, reject) => {
			const image = new Image()
			image.onload = () => resolve(image)
			image.onerror = () => reject(new Error('Expected demo image to load successfully'))
			image.src = sourceUrl
		})
	}
}
