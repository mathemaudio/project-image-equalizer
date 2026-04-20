import { LitElement, css, html, svg, type TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Spec } from '@shared/lll.lll'
import type { EqualizerBand } from './EqualizerBand.lll'

@Spec('Renders the shared overlapping band graph and supports direct drag editing of center frequency and gain.')
@customElement('equalizer-graph')
export class EqualizerGraph extends LitElement {
	static styles = css`
		:host {
			display: block;
		}

		button.graph-shell {
			width: 100%;
			padding: 0;
			border: 0;
			background: transparent;
			cursor: grab;
			text-align: left;
		}

		button.graph-shell:active {
			cursor: grabbing;
		}

		svg {
			display: block;
			width: 100%;
			height: auto;
			border-radius: 18px;
			background: radial-gradient(circle at top, rgba(48, 67, 120, 0.18), rgba(8, 13, 25, 0.95));
			border: 1px solid rgba(255, 255, 255, 0.09);
			box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
		}

		.axis-labels {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			gap: 8px;
			font-size: 0.8rem;
			color: rgba(231, 238, 255, 0.68);
		}

		.instructions {
			margin-top: 8px;
			font-size: 0.82rem;
			color: rgba(231, 238, 255, 0.74);
		}
	`

	@property({ attribute: false })
	bands: EqualizerBand[] = []

	@property({ type: Number })
	selectedBandId: number = 0

	@state()
	private dragBandId: number | null = null

	private readonly graphWidth: number = 760
	private readonly graphHeight: number = 360
	private readonly graphPadding = { left: 58, right: 18, top: 20, bottom: 38 }

	@Spec('Renders the frequency graph, band curves, and draggable control points.')
	render(): TemplateResult {
		const totalGainPath = this.createCombinedPath()
		const gainTicks = [-18, -12, -6, 0, 6, 12, 18]
		const frequencyTicks = [0.02, 0.05, 0.1, 0.2, 0.4, 0.7, 1]
		return html`
			<button
				class="graph-shell"
				@pointermove=${this.onPointerMove}
				@pointerup=${this.onPointerEnd}
				@pointercancel=${this.onPointerEnd}
				@pointerleave=${this.onPointerEnd}
				aria-label="Frequency equalizer graph"
			>
				<svg viewBox="0 0 ${this.graphWidth} ${this.graphHeight}" role="img" aria-label="Frequency equalizer graph with draggable band controls">
					<defs>
						<linearGradient id="sum-line" x1="0" x2="1" y1="0" y2="0">
							<stop offset="0%" stop-color="#7de6ff"></stop>
							<stop offset="100%" stop-color="#ffd16d"></stop>
						</linearGradient>
					</defs>
					<rect x="0" y="0" width="${this.graphWidth}" height="${this.graphHeight}" fill="transparent"></rect>
					${gainTicks.map((gain) => this.renderGainGridLine(gain))}
					${frequencyTicks.map((frequency) => this.renderFrequencyGridLine(frequency))}
					<path d="${totalGainPath}" fill="none" stroke="url(#sum-line)" stroke-width="4" stroke-linecap="round"></path>
					${this.bands.map((band) => this.renderBandCurve(band))}
					${this.bands.map((band) => this.renderBandHandle(band))}
					<text x="16" y="18" fill="rgba(231,238,255,0.82)" font-size="12">Gain (dB)</text>
					<text x="${this.graphWidth - 118}" y="${this.graphHeight - 8}" fill="rgba(231,238,255,0.82)" font-size="12">Frequency →</text>
				</svg>
			</button>
			<div class="axis-labels">
				<span>Low texture</span>
				<span>Mid detail</span>
				<span>Fine texture</span>
			</div>
			<div class="instructions">Drag a colored point left/right for frequency and up/down for gain. Use the Q slider on the matching band card for width.</div>
		`
	}

	@Spec('Renders one horizontal gain grid line and label.')
	private renderGainGridLine(gain: number): TemplateResult {
		const y = this.gainToY(gain)
		const isZero = gain === 0
		return svg`
			<g>
				<line
					x1="${this.graphPadding.left}"
					y1="${y}"
					x2="${this.graphWidth - this.graphPadding.right}"
					y2="${y}"
					stroke="${isZero ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.08)'}"
					stroke-dasharray="${isZero ? '0' : '4 8'}"
				></line>
				<text x="10" y="${y + 4}" fill="rgba(231,238,255,0.62)" font-size="12">${gain > 0 ? '+' : ''}${gain}</text>
			</g>
		`
	}

	@Spec('Renders one vertical frequency grid line and label.')
	private renderFrequencyGridLine(frequency: number): TemplateResult {
		const x = this.frequencyToX(frequency)
		return svg`
			<g>
				<line
					x1="${x}"
					y1="${this.graphPadding.top}"
					x2="${x}"
					y2="${this.graphHeight - this.graphPadding.bottom}"
					stroke="rgba(255,255,255,0.08)"
					stroke-dasharray="4 8"
				></line>
				<text x="${x - 10}" y="${this.graphHeight - 14}" fill="rgba(231,238,255,0.62)" font-size="12">${Math.round(frequency * 100)}%</text>
			</g>
		`
	}

	@Spec('Renders one band influence curve on the shared graph.')
	private renderBandCurve(band: EqualizerBand): TemplateResult {
		const pathData = this.createBandPath(band)
		return svg`
			<path d="${pathData}" fill="none" stroke="${band.color}" stroke-width="2.5" stroke-linecap="round" opacity="0.8"></path>
		`
	}

	@Spec('Renders one draggable band handle and its label.')
	private renderBandHandle(band: EqualizerBand): TemplateResult {
		const x = this.frequencyToX(band.center)
		const y = this.gainToY(band.gain)
		const isSelected = band.id === this.selectedBandId
		return svg`
			<g>
				<circle
					cx="${x}"
					cy="${y}"
					r="${isSelected ? 11 : 8}"
					fill="${band.color}"
					stroke="white"
					stroke-width="${isSelected ? 3 : 2}"
					style="cursor: grab;"
					@pointerdown=${(event: PointerEvent) => this.onHandlePointerDown(event, band.id)}
				></circle>
				<text x="${x + 12}" y="${y - 12}" fill="${band.color}" font-size="12" font-weight="700">${band.label}</text>
			</g>
		`
	}

	@Spec('Begins drag editing for the selected band and captures pointer updates.')
	private onHandlePointerDown(event: PointerEvent, bandId: number) {
		event.preventDefault()
		this.dragBandId = bandId
		this.selectedBandId = bandId
		const target = event.currentTarget
		if (target instanceof Element && 'setPointerCapture' in target) {
			try {
				(target as Element & { setPointerCapture(pointerId: number): void }).setPointerCapture(event.pointerId)
			} catch {
				// Synthetic test events may not own an active browser pointer; dragging can still proceed without capture.
			}
		}
		this.dispatchBandSelection(bandId)
		this.dispatchBandDragState(bandId, true)
		this.dispatchBandPosition(event)
	}

	@Spec('Updates the actively dragged band position from pointer movement across the graph.')
	private onPointerMove(event: PointerEvent) {
		if (this.dragBandId === null) {
			return
		}
		this.dispatchBandPosition(event)
	}

	@Spec('Ends direct manipulation when the pointer interaction finishes.')
	private onPointerEnd() {
		if (this.dragBandId !== null) {
			this.dispatchBandDragState(this.dragBandId, false)
		}
		this.dragBandId = null
	}

	@Spec('Sends a user edit event that updates the dragged band center frequency and gain.')
	private dispatchBandPosition(event: PointerEvent) {
		if (this.dragBandId === null) {
			return
		}
		const svgElement = this.shadowRoot?.querySelector('svg')
		if (svgElement === null || svgElement === undefined) {
			return
		}
		const bounds = svgElement.getBoundingClientRect()
		if (bounds.width === 0 || bounds.height === 0) {
			return
		}
		const normalizedX = this.clamp((event.clientX - bounds.left) / bounds.width, 0, 1)
		const normalizedY = this.clamp((event.clientY - bounds.top) / bounds.height, 0, 1)
		const x = this.graphPadding.left + (normalizedX * this.plotWidth())
		const y = this.graphPadding.top + (normalizedY * this.plotHeight())
		this.dispatchEvent(new CustomEvent('band-change', {
			bubbles: true,
			composed: true,
			detail: {
				id: this.dragBandId,
				center: this.xToFrequency(x),
				gain: this.yToGain(y),
			},
		}))
	}

	@Spec('Sends a user selection event when a band handle becomes active.')
	private dispatchBandSelection(bandId: number) {
		this.dispatchEvent(new CustomEvent('band-select', {
			bubbles: true,
			composed: true,
			detail: { id: bandId },
		}))
	}

	@Spec('Sends a drag-state event so the host can switch between live preview and final rendering quality.')
	private dispatchBandDragState(bandId: number, isDragging: boolean) {
		this.dispatchEvent(new CustomEvent('band-drag-state', {
			bubbles: true,
			composed: true,
			detail: { id: bandId, isDragging },
		}))
	}

	@Spec('Builds the visible path for one overlapping band curve.')
	private createBandPath(band: EqualizerBand): string {
		const points: string[] = []
		for (let step = 0; step <= 120; step += 1) {
			const frequency = 0.01 + (step / 120) * 0.99
			const safeCenter = Math.max(0.01, band.center)
			const spread = Math.max(0.05, 1.6 / Math.max(0.35, band.q))
			const distance = Math.log2(frequency / safeCenter)
			const influence = Math.exp(-0.5 * Math.pow(distance / spread, 2))
			const gain = band.gain * influence
			const x = this.frequencyToX(frequency)
			const y = this.gainToY(gain)
			points.push(`${step === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
		}
		return points.join(' ')
	}

	@Spec('Builds the visible path for the combined influence of all equalizer bands.')
	private createCombinedPath(): string {
		const points: string[] = []
		for (let step = 0; step <= 160; step += 1) {
			const frequency = 0.01 + (step / 160) * 0.99
			let gain = 0
			for (const band of this.bands) {
				const safeCenter = Math.max(0.01, band.center)
				const spread = Math.max(0.05, 1.6 / Math.max(0.35, band.q))
				const distance = Math.log2(frequency / safeCenter)
				const influence = Math.exp(-0.5 * Math.pow(distance / spread, 2))
				gain += band.gain * influence
			}
			const x = this.frequencyToX(frequency)
			const y = this.gainToY(gain)
			points.push(`${step === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
		}
		return points.join(' ')
	}

	@Spec('Maps a normalized frequency value onto the graph x axis with logarithmic spacing.')
	private frequencyToX(frequency: number): number {
		const minLog = Math.log10(0.01)
		const maxLog = Math.log10(1)
		const position = (Math.log10(Math.max(0.01, frequency)) - minLog) / (maxLog - minLog)
		return this.graphPadding.left + (position * this.plotWidth())
	}

	@Spec('Maps a graph x coordinate back into a normalized frequency value.')
	private xToFrequency(x: number): number {
		const position = this.clamp((x - this.graphPadding.left) / this.plotWidth(), 0, 1)
		const minLog = Math.log10(0.01)
		const maxLog = Math.log10(1)
		return Math.pow(10, minLog + (position * (maxLog - minLog)))
	}

	@Spec('Maps a gain in decibels onto the graph y axis.')
	private gainToY(gain: number): number {
		const position = 1 - ((this.clamp(gain, -18, 18) + 18) / 36)
		return this.graphPadding.top + (position * this.plotHeight())
	}

	@Spec('Maps a graph y coordinate back into a gain in decibels.')
	private yToGain(y: number): number {
		const position = this.clamp((y - this.graphPadding.top) / this.plotHeight(), 0, 1)
		return ((1 - position) * 36) - 18
	}

	@Spec('Returns the drawable plot width inside graph padding.')
	private plotWidth(): number {
		return this.graphWidth - this.graphPadding.left - this.graphPadding.right
	}

	@Spec('Returns the drawable plot height inside graph padding.')
	private plotHeight(): number {
		return this.graphHeight - this.graphPadding.top - this.graphPadding.bottom
	}

	@Spec('Constrains pointer-derived graph coordinates to safe interactive bounds.')
	private clamp(value: number, minimum: number, maximum: number): number {
		return Math.min(maximum, Math.max(minimum, value))
	}
}
