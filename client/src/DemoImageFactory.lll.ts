import { Spec } from '@shared/lll.lll'

@Spec('Builds a playful in-browser demo image so the equalizer can be explored without uploading a file first.')
export class DemoImageFactory {
	@Spec('Creates a colorful square demo bitmap and returns it as a data URL with its dimensions.')
	static createDataUrl(size: number = 320): { dataUrl: string, width: number, height: number } {
		const canvas = document.createElement('canvas')
		canvas.width = size
		canvas.height = size
		const context = canvas.getContext('2d')
		if (context === null) {
			throw new Error('2D canvas context is required to create the demo image')
		}

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

		return {
			dataUrl: canvas.toDataURL('image/png'),
			width: size,
			height: size,
		}
	}
}
