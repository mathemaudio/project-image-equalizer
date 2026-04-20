import { Spec } from '@shared/lll.lll'
import type { EqualizerBand } from './EqualizerBand.lll'
import type { ProcessedImageSummary } from './ProcessedImageSummary.lll'

@Spec('Transforms uploaded images in the browser by shaping FFT-domain magnitudes with overlapping equalizer bands.')
export class FrequencyImageProcessor {
	@Spec('Runs FFT-domain magnitude shaping on image luminance and returns a display-ready processed data URL plus summary details.')
	static async process(
		image: HTMLImageElement,
		bands: EqualizerBand[],
		workingSize: number,
		sourceLabel: string,
	): Promise<{ dataUrl: string, summary: ProcessedImageSummary }> {
		const size = this.resolveWorkingSize(image.naturalWidth, image.naturalHeight, workingSize)
		const sourceCanvas = document.createElement('canvas')
		sourceCanvas.width = size
		sourceCanvas.height = size
		const sourceContext = sourceCanvas.getContext('2d', { willReadFrequently: true })
		if (sourceContext === null) {
			throw new Error('2D canvas context is required for image processing')
		}

		sourceContext.drawImage(image, 0, 0, size, size)
		const sourceImage = sourceContext.getImageData(0, 0, size, size)
		const pixelCount = size * size
		const luminance = new Float64Array(pixelCount)
		const red = new Uint8ClampedArray(pixelCount)
		const green = new Uint8ClampedArray(pixelCount)
		const blue = new Uint8ClampedArray(pixelCount)
		const alpha = new Uint8ClampedArray(pixelCount)
		const sourceData = sourceImage.data

		for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
			const offset = pixelIndex * 4
			const r = sourceData[offset]
			const g = sourceData[offset + 1]
			const b = sourceData[offset + 2]
			const a = sourceData[offset + 3]
			red[pixelIndex] = r
			green[pixelIndex] = g
			blue[pixelIndex] = b
			alpha[pixelIndex] = a
			luminance[pixelIndex] = (0.299 * r) + (0.587 * g) + (0.114 * b)
		}

		const real = luminance.slice()
		const imaginary = new Float64Array(pixelCount)
		this.perform2dFft(real, imaginary, size, false)

		const averageOriginalEnergy = this.calculateAverageMagnitude(real, imaginary)
		const gainExtremes = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }
		for (let y = 0; y < size; y += 1) {
			const fy = y <= size / 2 ? y : y - size
			for (let x = 0; x < size; x += 1) {
				const fx = x <= size / 2 ? x : x - size
				const radius = Math.sqrt((fx * fx) + (fy * fy)) / (Math.sqrt(2) * (size / 2))
				const gain = this.calculateCombinedGain(radius, bands)
				const index = (y * size) + x
				real[index] *= gain
				imaginary[index] *= gain
				gainExtremes.min = Math.min(gainExtremes.min, gain)
				gainExtremes.max = Math.max(gainExtremes.max, gain)
			}
		}

		this.perform2dFft(real, imaginary, size, true)
		const averageProcessedEnergy = this.calculateAverageMagnitude(real, imaginary)
		const outputImage = new ImageData(size, size)

		for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
			const originalLuma = Math.max(1, luminance[pixelIndex])
			const processedLuma = this.clamp(real[pixelIndex], 0, 255)
			const ratio = processedLuma / originalLuma
			const offset = pixelIndex * 4
			outputImage.data[offset] = this.clamp(red[pixelIndex] * ratio, 0, 255)
			outputImage.data[offset + 1] = this.clamp(green[pixelIndex] * ratio, 0, 255)
			outputImage.data[offset + 2] = this.clamp(blue[pixelIndex] * ratio, 0, 255)
			outputImage.data[offset + 3] = alpha[pixelIndex]
		}

		const resultCanvas = document.createElement('canvas')
		resultCanvas.width = image.naturalWidth
		resultCanvas.height = image.naturalHeight
		const resultContext = resultCanvas.getContext('2d')
		if (resultContext === null) {
			throw new Error('2D canvas context is required for result rendering')
		}

		const tempCanvas = document.createElement('canvas')
		tempCanvas.width = size
		tempCanvas.height = size
		const tempContext = tempCanvas.getContext('2d')
		if (tempContext === null) {
			throw new Error('2D canvas context is required for intermediate rendering')
		}
		tempContext.putImageData(outputImage, 0, 0)
		resultContext.imageSmoothingEnabled = true
		resultContext.imageSmoothingQuality = 'high'
		resultContext.drawImage(tempCanvas, 0, 0, image.naturalWidth, image.naturalHeight)

		return {
			dataUrl: resultCanvas.toDataURL('image/png'),
			summary: {
				sourceLabel,
				workingWidth: size,
				workingHeight: size,
				energyDeltaPercent: averageOriginalEnergy === 0 ? 0 : ((averageProcessedEnergy / averageOriginalEnergy) - 1) * 100,
				gainExtremesText: `${gainExtremes.min.toFixed(2)}× to ${gainExtremes.max.toFixed(2)}×`,
				bandSnapshotText: bands
					.map((band) => `${band.label}: ${Math.round(band.center * 100)}% / ${band.gain > 0 ? '+' : ''}${band.gain.toFixed(1)} dB / Q ${band.q.toFixed(1)}`)
					.join(' · '),
			},
		}
	}

	@Spec('Chooses a square power-of-two working size that stays responsive for in-browser FFT processing.')
	private static resolveWorkingSize(width: number, height: number, preferredSize: number): number {
		const smallestEdge = Math.max(32, Math.min(width, height, preferredSize))
		let powerOfTwo = 32
		while ((powerOfTwo * 2) <= smallestEdge) {
			powerOfTwo *= 2
		}
		return powerOfTwo
	}

	@Spec('Calculates the combined linear magnitude gain for a normalized radial image frequency.')
	private static calculateCombinedGain(radius: number, bands: EqualizerBand[]): number {
		const safeRadius = Math.max(1e-4, Math.min(1, radius))
		let totalDecibels = 0
		for (const band of bands) {
			const safeCenter = Math.max(1e-4, Math.min(1, band.center))
			const spread = Math.max(0.05, 1.6 / Math.max(0.35, band.q))
			const distance = Math.log2(safeRadius / safeCenter)
			const influence = Math.exp(-0.5 * Math.pow(distance / spread, 2))
			totalDecibels += band.gain * influence
		}
		return Math.pow(10, totalDecibels / 20)
	}

	@Spec('Computes average spectral magnitude for visible processing diagnostics.')
	private static calculateAverageMagnitude(real: Float64Array, imaginary: Float64Array): number {
		let total = 0
		for (let index = 0; index < real.length; index += 1) {
			total += Math.sqrt((real[index] * real[index]) + (imaginary[index] * imaginary[index]))
		}
		return total / Math.max(1, real.length)
	}

	@Spec('Runs a separable 2D FFT or inverse FFT over square image data.')
	private static perform2dFft(real: Float64Array, imaginary: Float64Array, size: number, inverse: boolean) {
		for (let y = 0; y < size; y += 1) {
			const rowReal = new Float64Array(size)
			const rowImaginary = new Float64Array(size)
			for (let x = 0; x < size; x += 1) {
				const index = (y * size) + x
				rowReal[x] = real[index]
				rowImaginary[x] = imaginary[index]
			}
			this.perform1dFft(rowReal, rowImaginary, inverse)
			for (let x = 0; x < size; x += 1) {
				const index = (y * size) + x
				real[index] = rowReal[x]
				imaginary[index] = rowImaginary[x]
			}
		}

		for (let x = 0; x < size; x += 1) {
			const columnReal = new Float64Array(size)
			const columnImaginary = new Float64Array(size)
			for (let y = 0; y < size; y += 1) {
				const index = (y * size) + x
				columnReal[y] = real[index]
				columnImaginary[y] = imaginary[index]
			}
			this.perform1dFft(columnReal, columnImaginary, inverse)
			for (let y = 0; y < size; y += 1) {
				const index = (y * size) + x
				real[index] = columnReal[y]
				imaginary[index] = columnImaginary[y]
			}
		}
	}

	@Spec('Performs an in-place radix-2 FFT or inverse FFT on one complex signal.')
	private static perform1dFft(real: Float64Array, imaginary: Float64Array, inverse: boolean) {
		const length = real.length
		let j = 0
		for (let i = 1; i < length; i += 1) {
			let bit = length >> 1
			while ((j & bit) !== 0) {
				j ^= bit
				bit >>= 1
			}
			j ^= bit
			if (i < j) {
				const tempReal = real[i]
				const tempImaginary = imaginary[i]
				real[i] = real[j]
				imaginary[i] = imaginary[j]
				real[j] = tempReal
				imaginary[j] = tempImaginary
			}
		}

		for (let size = 2; size <= length; size <<= 1) {
			const angle = (inverse ? 2 : -2) * Math.PI / size
			const stepCosine = Math.cos(angle)
			const stepSine = Math.sin(angle)
			for (let offset = 0; offset < length; offset += size) {
				let cosine = 1
				let sine = 0
				const halfSize = size >> 1
				for (let index = 0; index < halfSize; index += 1) {
					const evenIndex = offset + index
					const oddIndex = evenIndex + halfSize
					const oddReal = (cosine * real[oddIndex]) - (sine * imaginary[oddIndex])
					const oddImaginary = (cosine * imaginary[oddIndex]) + (sine * real[oddIndex])
					real[oddIndex] = real[evenIndex] - oddReal
					imaginary[oddIndex] = imaginary[evenIndex] - oddImaginary
					real[evenIndex] += oddReal
					imaginary[evenIndex] += oddImaginary
					const nextCosine = (cosine * stepCosine) - (sine * stepSine)
					sine = (cosine * stepSine) + (sine * stepCosine)
					cosine = nextCosine
				}
			}
		}

		if (inverse) {
			for (let index = 0; index < length; index += 1) {
				real[index] /= length
				imaginary[index] /= length
			}
		}
	}

	@Spec('Constrains a numeric sample to an inclusive display-safe range.')
	private static clamp(value: number, minimum: number, maximum: number): number {
		return Math.min(maximum, Math.max(minimum, value))
	}
}
