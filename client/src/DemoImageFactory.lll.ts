import { Spec } from './lll.lll'

@Spec('Builds procedural in-browser demo images so the equalizer can be explored without uploading a file first.')
export class DemoImageFactory {
	@Spec('Creates the scenic default demo bitmap and returns it as a data URL with its dimensions.')
	static createScenicDataUrl(size: number = 320): { dataUrl: string, width: number, height: number } {
		const context = this.createContext(size)
		const skyGradient = context.createLinearGradient(0, 0, 0, size)
		skyGradient.addColorStop(0, '#7ac8ff')
		skyGradient.addColorStop(0.45, '#c9ebff')
		skyGradient.addColorStop(0.72, '#f8f3d0')
		skyGradient.addColorStop(1, '#5ea86e')
		context.fillStyle = skyGradient
		context.fillRect(0, 0, size, size)

		context.save()
		context.globalAlpha = 0.22
		for (let index = 0; index < 10; index += 1) {
			const cloudY = size * (0.12 + index * 0.055)
			context.fillStyle = index % 2 === 0 ? '#ffffff' : '#dff3ff'
			context.beginPath()
			context.ellipse(size * (0.18 + (index % 4) * 0.2), cloudY, size * 0.16, size * 0.04, 0, 0, Math.PI * 2)
			context.ellipse(size * (0.32 + (index % 3) * 0.2), cloudY + size * 0.01, size * 0.2, size * 0.05, 0, 0, Math.PI * 2)
			context.fill()
		}
		context.restore()

		context.save()
		context.strokeStyle = 'rgba(38, 53, 74, 0.7)'
		context.lineWidth = Math.max(1.2, size / 190)
		for (let index = 0; index < 7; index += 1) {
			const birdX = size * (0.14 + index * 0.1)
			const birdY = size * (0.18 + (index % 3) * 0.06)
			const wingSpan = size * (0.018 + (index % 2) * 0.007)
			this.strokeBird(context, birdX, birdY, wingSpan)
		}
		context.restore()

		context.fillStyle = '#6f8fb6'
		this.fillMountainRange(context, size, [
			[size * -0.05, size * 0.58],
			[size * 0.12, size * 0.33],
			[size * 0.28, size * 0.56],
			[size * 0.46, size * 0.29],
			[size * 0.63, size * 0.58],
			[size * 0.82, size * 0.36],
			[size * 1.05, size * 0.6],
		])
		context.fillStyle = '#4d6b59'
		this.fillMountainRange(context, size, [
			[size * -0.05, size * 0.72],
			[size * 0.16, size * 0.47],
			[size * 0.36, size * 0.74],
			[size * 0.54, size * 0.5],
			[size * 0.73, size * 0.74],
			[size * 0.92, size * 0.52],
			[size * 1.05, size * 0.76],
		])

		context.save()
		context.strokeStyle = 'rgba(255,255,255,0.3)'
		context.lineWidth = Math.max(1.4, size / 180)
		for (let index = 0; index < 14; index += 1) {
			const y = size * (0.58 + index * 0.03)
			context.beginPath()
			context.moveTo(0, y)
			for (let x = 0; x <= size; x += 8) {
				const wave = Math.sin((x / size) * Math.PI * 4 + index * 0.5) * (size / 170)
				context.lineTo(x, y + wave)
			}
			context.stroke()
		}
		context.restore()

		context.fillStyle = '#2e5a38'
		for (let index = 0; index < 13; index += 1) {
			const baseX = size * (0.04 + index * 0.077)
			const height = size * (0.12 + (index % 4) * 0.02)
			this.fillTree(context, baseX, size * 0.82, size * 0.03, height)
		}
		context.fillStyle = '#203625'
		for (let index = 0; index < 11; index += 1) {
			const baseX = size * (0.02 + index * 0.094)
			const height = size * (0.09 + (index % 3) * 0.018)
			this.fillTree(context, baseX, size * 0.92, size * 0.028, height)
		}

		context.save()
		const glow = context.createRadialGradient(size * 0.76, size * 0.24, size * 0.02, size * 0.76, size * 0.24, size * 0.13)
		glow.addColorStop(0, 'rgba(255,250,223,0.95)')
		glow.addColorStop(0.5, 'rgba(255,235,182,0.35)')
		glow.addColorStop(1, 'rgba(255,255,255,0)')
		context.fillStyle = glow
		context.beginPath()
		context.arc(size * 0.76, size * 0.24, size * 0.13, 0, Math.PI * 2)
		context.fill()
		context.restore()

		return this.createResult(context, size)
	}

	@Spec('Creates the original abstract demo bitmap and returns it as a data URL with its dimensions.')
	static createAbstractDataUrl(size: number = 320): { dataUrl: string, width: number, height: number } {
		const context = this.createContext(size)
		const gradient = context.createLinearGradient(0, 0, size, size)
		gradient.addColorStop(0, '#ff7a7a')
		gradient.addColorStop(0.28, '#ffd86b')
		gradient.addColorStop(0.56, '#68d5ff')
		gradient.addColorStop(0.84, '#8d7dff')
		gradient.addColorStop(1, '#1b1e2a')
		context.fillStyle = gradient
		context.fillRect(0, 0, size, size)

		context.save()
		context.globalAlpha = 0.2
		for (let index = 0; index < 18; index += 1) {
			const stripeX = (index / 18) * size
			context.fillStyle = index % 2 === 0 ? '#ffffff' : '#101522'
			context.fillRect(stripeX, 0, size / 36, size)
		}
		context.restore()

		context.save()
		context.strokeStyle = 'rgba(255,255,255,0.45)'
		context.lineWidth = Math.max(2, size / 90)
		for (let index = 0; index < 14; index += 1) {
			const y = ((index + 0.5) / 14) * size
			context.beginPath()
			context.moveTo(0, y)
			for (let x = 0; x <= size; x += 8) {
				const wave = Math.sin((x / size) * Math.PI * (index + 1.4)) * (size / 40)
				context.lineTo(x, y + wave)
			}
			context.stroke()
		}
		context.restore()

		context.save()
		context.globalCompositeOperation = 'screen'
		for (let index = 0; index < 9; index += 1) {
			const radius = size * (0.06 + index * 0.035)
			const centerX = size * (0.16 + (index % 3) * 0.27)
			const centerY = size * (0.2 + Math.floor(index / 3) * 0.25)
			const bubble = context.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius)
			bubble.addColorStop(0, `hsla(${index * 38}, 100%, 82%, 0.85)`)
			bubble.addColorStop(1, 'rgba(255,255,255,0)')
			context.fillStyle = bubble
			context.beginPath()
			context.arc(centerX, centerY, radius, 0, Math.PI * 2)
			context.fill()
		}
		context.restore()

		context.save()
		context.strokeStyle = 'rgba(16, 21, 34, 0.82)'
		context.lineWidth = Math.max(3, size / 64)
		context.beginPath()
		context.moveTo(size * 0.08, size * 0.78)
		context.bezierCurveTo(size * 0.24, size * 0.55, size * 0.36, size * 0.86, size * 0.5, size * 0.48)
		context.bezierCurveTo(size * 0.62, size * 0.2, size * 0.78, size * 0.7, size * 0.92, size * 0.28)
		context.stroke()
		context.restore()

		return this.createResult(context, size)
	}

	@Spec('Creates a sized 2D drawing context for demo image rendering.')
	private static createContext(size: number): CanvasRenderingContext2D {
		const canvas = document.createElement('canvas')
		canvas.width = size
		canvas.height = size
		const context = canvas.getContext('2d')
		if (context === null) {
			throw new Error('2D canvas context is required to create the demo image')
		}
		return context
	}

	@Spec('Closes and fills a mountain silhouette across the canvas width.')
	private static fillMountainRange(context: CanvasRenderingContext2D, size: number, points: Array<[number, number]>) {
		context.beginPath()
		context.moveTo(points[0][0], points[0][1])
		for (const point of points.slice(1)) {
			context.lineTo(point[0], point[1])
		}
		context.lineTo(size, size)
		context.lineTo(0, size)
		context.closePath()
		context.fill()
	}

	@Spec('Draws a simple layered evergreen silhouette at the requested position.')
	private static fillTree(context: CanvasRenderingContext2D, baseX: number, baseY: number, halfWidth: number, height: number) {
		context.fillRect(baseX - halfWidth * 0.16, baseY - height * 0.18, halfWidth * 0.32, height * 0.18)
		for (let tier = 0; tier < 3; tier += 1) {
			const tierBaseY = baseY - tier * height * 0.22
			const tierHalfWidth = halfWidth * (1.6 - tier * 0.28)
			const tierHeight = height * (0.42 - tier * 0.06)
			context.beginPath()
			context.moveTo(baseX, tierBaseY - tierHeight)
			context.lineTo(baseX + tierHalfWidth, tierBaseY)
			context.lineTo(baseX - tierHalfWidth, tierBaseY)
			context.closePath()
			context.fill()
		}
	}

	@Spec('Draws a small flying bird silhouette with two curved wings.')
	private static strokeBird(context: CanvasRenderingContext2D, centerX: number, centerY: number, wingSpan: number) {
		context.beginPath()
		context.moveTo(centerX - wingSpan, centerY)
		context.quadraticCurveTo(centerX - wingSpan * 0.45, centerY - wingSpan * 0.85, centerX, centerY)
		context.quadraticCurveTo(centerX + wingSpan * 0.45, centerY - wingSpan * 0.85, centerX + wingSpan, centerY)
		context.stroke()
	}

	@Spec('Packages a rendered demo context into the common data URL response format.')
	private static createResult(context: CanvasRenderingContext2D, size: number): { dataUrl: string, width: number, height: number } {
		return {
			dataUrl: context.canvas.toDataURL('image/png'),
			width: size,
			height: size,
		}
	}
}
