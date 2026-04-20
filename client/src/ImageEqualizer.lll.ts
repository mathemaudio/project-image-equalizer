import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Spec } from '@shared/lll.lll'
import { DemoImageFactory } from './DemoImageFactory.lll'
import type { EqualizerBand } from './EqualizerBand.lll'
import { FrequencyImageProcessor } from './FrequencyImageProcessor.lll'
import type { ProcessedImageSummary } from './ProcessedImageSummary.lll'
import './EqualizerGraph.lll'

@Spec('Hosts the client-side interactive image frequency equalizer with previews, upload controls, and draggable spectral bands.')
@customElement('image-equalizer')
export class ImageEqualizer extends LitElement {
	static styles = css`
		:host {
			display: block;
			color: #f3f6ff;
		}

		main {
			display: grid;
			grid-template-columns: minmax(320px, 0.95fr) minmax(360px, 1.05fr);
			gap: 24px;
			align-items: start;
		}

		.panel {
			background: rgba(10, 14, 28, 0.78);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 24px;
			padding: 20px;
			backdrop-filter: blur(14px);
			box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
		}

		.preview-panel {
			display: grid;
			gap: 18px;
		}

		.section-heading {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 12px;
			margin-bottom: 10px;
		}

		h2,
		h3,
		p {
			margin: 0;
		}

		.subtle {
			color: rgba(234, 240, 255, 0.75);
		}

		.actions {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
		}

		label.upload,
		button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 11px 14px;
			border-radius: 14px;
			border: 1px solid rgba(255, 255, 255, 0.12);
			font-weight: 700;
			font-size: 0.96rem;
			cursor: pointer;
			transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
		}

		label.upload,
		button.primary {
			background: linear-gradient(135deg, #6c8dff, #59d0ff);
			color: #09111b;
		}

		button.secondary {
			background: rgba(255, 255, 255, 0.08);
			color: #f3f6ff;
		}

		label.upload:hover,
		button:hover {
			transform: translateY(-1px);
			box-shadow: 0 10px 26px rgba(0, 0, 0, 0.24);
		}

		input[type='file'] {
			display: none;
		}

		.preview-stack {
			display: grid;
			gap: 18px;
		}

		figure {
			margin: 0;
			display: grid;
			gap: 10px;
		}

		.figure-title {
			display: flex;
			justify-content: space-between;
			gap: 10px;
			align-items: baseline;
		}

		img.preview {
			width: 100%;
			display: block;
			border-radius: 20px;
			background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
			border: 1px solid rgba(255,255,255,0.08);
			object-fit: contain;
		}

		img.preview.original {
			max-height: 210px;
		}

		img.preview.processed {
			max-height: 430px;
		}

		.empty {
			min-height: 180px;
			border-radius: 18px;
			border: 1px dashed rgba(255,255,255,0.2);
			display: grid;
			place-items: center;
			padding: 16px;
			text-align: center;
			color: rgba(234,240,255,0.72);
			background: rgba(255,255,255,0.03);
		}

		.status-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			gap: 10px;
		}

		.stat {
			padding: 12px 14px;
			border-radius: 16px;
			background: rgba(255,255,255,0.05);
			border: 1px solid rgba(255,255,255,0.07);
		}

		.stat-label {
			font-size: 0.74rem;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: rgba(234,240,255,0.56);
		}

		.stat-value {
			margin-top: 6px;
			font-weight: 700;
			font-size: 1rem;
		}

		.eq-panel {
			display: grid;
			gap: 18px;
		}

		.band-list {
			display: grid;
			gap: 10px;
			grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
		}

		.band-card {
			padding: 14px;
			border-radius: 18px;
			border: 1px solid rgba(255,255,255,0.08);
			background: rgba(255,255,255,0.04);
			display: grid;
			gap: 10px;
		}

		.band-card.active {
			border-color: rgba(255,255,255,0.18);
			box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
		}

		.band-topline {
			display: flex;
			justify-content: space-between;
			gap: 12px;
			align-items: center;
		}

		.band-swatch {
			width: 13px;
			height: 13px;
			border-radius: 50%;
			box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
		}

		.band-readout {
			font-size: 0.84rem;
			color: rgba(234,240,255,0.78);
		}

		label.slider {
			display: grid;
			gap: 6px;
			font-size: 0.82rem;
			color: rgba(234,240,255,0.78);
		}

		input[type='range'] {
			width: 100%;
		}

		.processing-note {
			padding: 12px 14px;
			border-radius: 16px;
			background: rgba(92, 114, 255, 0.12);
			border: 1px solid rgba(127, 154, 255, 0.18);
			color: rgba(240, 244, 255, 0.88);
			font-size: 0.9rem;
		}

		@media (max-width: 1120px) {
			main {
				grid-template-columns: 1fr;
			}
		}
	`

	@state()
	private bands: EqualizerBand[] = this.createDefaultBands(5)

	@state()
	private selectedBandId: number = 3

	@state()
	private originalImageUrl: string | null = null

	@state()
	private processedImageUrl: string | null = null

	@state()
	private sourceLabel: string = 'No image loaded yet'

	@state()
	private sourceDimensionsText: string = 'Load an image or start with the demo artwork.'

	@state()
	private processingStateText: string = 'Waiting for an image'

	@state()
	private processedSummary: ProcessedImageSummary | null = null

	private loadedImage: HTMLImageElement | null = null
	private processingTicket: number = 0
	private pendingScheduleHandle: number | null = null
	private pendingSchedulePreviewQuality: boolean = false
	private isDraggingBand: boolean = false
	private isProcessingPassActive: boolean = false
	private needsAnotherProcessingPass: boolean = false
	private queuedProcessingPreviewQuality: boolean = false

	@Spec('Renders the dual-preview layout and the interactive equalizer controls.')
	render(): TemplateResult {
		const selectedBand = this.bands.find((band) => band.id === this.selectedBandId) ?? this.bands[0]
		return html`
			<main>
				<section class="panel preview-panel">
					<div class="section-heading">
						<div>
							<h2>Image previews</h2>
							<p class="subtle">Original up top, processed below, all in your browser.</p>
						</div>
						<div class="actions">
							<label class="upload">
								Upload image
								<input type="file" accept="image/*" @change=${this.onFileSelected} aria-label="Upload image" />
							</label>
							<button class="primary" @click=${this.onLoadDemoImage}>Load demo image</button>
							<button class="secondary" @click=${this.onResetBands}>Reset bands</button>
						</div>
					</div>

					<div class="status-grid">
						<div class="stat">
							<div class="stat-label">Source</div>
							<div class="stat-value" id="source-label">${this.sourceLabel}</div>
						</div>
						<div class="stat">
							<div class="stat-label">Dimensions</div>
							<div class="stat-value" id="source-dimensions">${this.sourceDimensionsText}</div>
						</div>
						<div class="stat">
							<div class="stat-label">Processing</div>
							<div class="stat-value" id="processing-state">${this.processingStateText}</div>
						</div>
					</div>

					<div class="preview-stack">
						<figure>
							<div class="figure-title">
								<h3>Original image</h3>
								<span class="subtle">Half-scale preview</span>
							</div>
							${this.originalImageUrl === null
				? html`<div class="empty">Upload an image or load the demo to see the original preview here.</div>`
				: html`<img class="preview original" alt="Original uploaded image preview" src="${this.originalImageUrl}" />`}
						</figure>
						<figure>
							<div class="figure-title">
								<h3>Processed image</h3>
								<span class="subtle">FFT-shaped output</span>
							</div>
							${this.processedImageUrl === null
				? html`<div class="empty">The processed preview appears here once an image is ready.</div>`
				: html`<img class="preview processed" alt="Processed equalized image preview" src="${this.processedImageUrl}" />`}
						</figure>
					</div>
				</section>

				<section class="panel eq-panel">
					<div class="section-heading">
						<div>
							<h2>Frequency equalizer</h2>
							<p class="subtle">Parametric-editor feel, FFT-domain magnitude shaping under the hood.</p>
						</div>
						<div class="band-readout" id="selected-band-readout">
							${selectedBand.label}: ${Math.round(selectedBand.center * 100)}% · ${selectedBand.gain > 0 ? '+' : ''}${selectedBand.gain.toFixed(1)} dB · Q ${selectedBand.q.toFixed(1)}
						</div>
					</div>

					<equalizer-graph
						.bands=${this.bands}
						.selectedBandId=${this.selectedBandId}
						@band-select=${this.onBandSelected}
						@band-change=${this.onBandDragged}
						@band-drag-state=${this.onBandDragStateChanged}
					></equalizer-graph>

					<div class="band-list">
						${this.bands.map((band) => html`
							<article class="band-card ${band.id === this.selectedBandId ? 'active' : ''}">
								<div class="band-topline">
									<div style="display:flex; align-items:center; gap:10px;">
										<span class="band-swatch" style="background:${band.color};"></span>
										<strong>${band.label}</strong>
									</div>
									<button class="secondary" @click=${() => this.onFocusBand(band.id)}>Focus</button>
								</div>
								<div class="band-readout">Center ${Math.round(band.center * 100)}% · Gain ${band.gain > 0 ? '+' : ''}${band.gain.toFixed(1)} dB</div>
								<label class="slider">
									<span>Width / Q</span>
									<input
										type="range"
										min="0.4"
										max="5"
										step="0.1"
										.value=${band.q.toFixed(1)}
										aria-label="${band.label} width Q"
										@input=${(event: Event) => this.onBandQChanged(event, band.id)}
									/>
								</label>
							</article>
						`)}
					</div>

					<div class="processing-note">
						This equalizer behaves like overlapping parametric bands in the UI, but the image math combines them into a radial FFT gain map so the phase stays untouched while magnitudes change.
					</div>

					${this.processedSummary === null ? null : html`
						<div class="status-grid">
							<div class="stat">
								<div class="stat-label">Working FFT size</div>
								<div class="stat-value" id="fft-size">${this.processedSummary.workingWidth} × ${this.processedSummary.workingHeight}</div>
							</div>
							<div class="stat">
								<div class="stat-label">Magnitude range</div>
								<div class="stat-value" id="gain-extremes">${this.processedSummary.gainExtremesText}</div>
							</div>
							<div class="stat">
								<div class="stat-label">Spectral energy shift</div>
								<div class="stat-value" id="energy-delta">${this.processedSummary.energyDeltaPercent >= 0 ? '+' : ''}${this.processedSummary.energyDeltaPercent.toFixed(1)}%</div>
							</div>
						</div>
						<p class="subtle" id="band-snapshot">${this.processedSummary.bandSnapshotText}</p>
					`}
				</section>
			</main>
		`
	}

	@Spec('Loads the built-in demo image so the app is immediately explorable.')
	firstUpdated() {
		void this.loadDemoImage()
	}

	@Spec('Loads the generated demo image when the user clicks the demo button.')
	private async onLoadDemoImage() {
		await this.loadDemoImage()
	}

	@Spec('Creates and loads the colorful demo image into the equalizer workflow.')
	private async loadDemoImage() {
		const demo = DemoImageFactory.createDataUrl(320)
		await this.loadImageSource(demo.dataUrl, 'Demo image', demo.width, demo.height)
	}

	@Spec('Reads the chosen local image file and loads it for in-browser processing.')
	private async onFileSelected(event: Event) {
		const input = event.target
		if (!(input instanceof HTMLInputElement)) {
			return
		}
		const file = input.files?.[0]
		if (file === undefined || file === null) {
			return
		}
		const fileUrl = await this.readFileAsDataUrl(file)
		await this.loadImageSource(fileUrl, file.name)
		input.value = ''
	}

	@Spec('Resets every band back to its default neutral-friendly layout and reprocesses the current image.')
	private onResetBands() {
		this.bands = this.createDefaultBands(this.bands.length)
		this.selectedBandId = this.bands[Math.floor(this.bands.length / 2)]?.id ?? 1
		this.scheduleProcessing()
	}

	@Spec('Focuses a band card and corresponding graph handle for easier editing.')
	private onFocusBand(bandId: number) {
		this.selectedBandId = bandId
	}

	@Spec('Selects the active band when the shared graph reports a handle interaction.')
	private onBandSelected(event: CustomEvent<{ id: number }>) {
		this.selectedBandId = event.detail.id
	}

	@Spec('Updates band center and gain from direct graph dragging, then schedules image reprocessing.')
	private onBandDragged(event: CustomEvent<{ id: number, center: number, gain: number }>) {
		const bandId = event.detail.id
		this.selectedBandId = bandId
		this.bands = this.bands.map((band) =>
			band.id === bandId
				? {
					...band,
					center: this.clamp(event.detail.center, 0.01, 1),
					gain: this.clamp(event.detail.gain, -18, 18),
				}
				: band,
		)
		this.scheduleProcessing(false, this.isDraggingBand)
	}

	@Spec('Switches processing cadence between live drag preview and final settled rendering.')
	private onBandDragStateChanged(event: CustomEvent<{ id: number, isDragging: boolean }>) {
		this.selectedBandId = event.detail.id
		this.isDraggingBand = event.detail.isDragging
		this.scheduleProcessing(!event.detail.isDragging, event.detail.isDragging)
	}

	@Spec('Updates a band width control and schedules image reprocessing.')
	private onBandQChanged(event: Event, bandId: number) {
		const input = event.target
		if (!(input instanceof HTMLInputElement)) {
			return
		}
		const q = Number(input.value)
		this.selectedBandId = bandId
		this.bands = this.bands.map((band) =>
			band.id === bandId
				? { ...band, q: this.clamp(q, 0.4, 5) }
				: band,
		)
		this.scheduleProcessing()
	}

	@Spec('Loads an image element from a source URL, stores previews, and triggers FFT processing.')
	private async loadImageSource(sourceUrl: string, label: string, knownWidth?: number, knownHeight?: number) {
		this.processingStateText = 'Loading image…'
		const image = await this.createLoadedImage(sourceUrl)
		this.loadedImage = image
		this.originalImageUrl = sourceUrl
		this.sourceLabel = label
		this.sourceDimensionsText = `${knownWidth ?? image.naturalWidth} × ${knownHeight ?? image.naturalHeight}`
		this.scheduleProcessing(true, false)
	}

	@Spec('Schedules a processing pass with live drag preview cadence or a settled full-quality render.')
	private scheduleProcessing(runImmediately: boolean = false, usePreviewQuality: boolean = false) {
		if (this.loadedImage === null) {
			return
		}
		this.processingStateText = usePreviewQuality ? 'Live preview…' : 'Processing FFT…'
		if (this.isProcessingPassActive) {
			if (this.needsAnotherProcessingPass) {
				this.queuedProcessingPreviewQuality = this.queuedProcessingPreviewQuality && usePreviewQuality
			} else {
				this.queuedProcessingPreviewQuality = usePreviewQuality
			}
			this.needsAnotherProcessingPass = true
			return
		}
		if (this.pendingScheduleHandle !== null) {
			if (runImmediately) {
				window.clearTimeout(this.pendingScheduleHandle)
				this.pendingScheduleHandle = null
			} else {
				this.pendingSchedulePreviewQuality = this.pendingSchedulePreviewQuality && usePreviewQuality
				return
			}
		}
		const delay = runImmediately ? 0 : (usePreviewQuality ? 16 : 70)
		this.pendingSchedulePreviewQuality = usePreviewQuality
		this.pendingScheduleHandle = window.setTimeout(() => {
			const scheduledPreviewQuality = this.pendingSchedulePreviewQuality
			this.pendingScheduleHandle = null
			this.pendingSchedulePreviewQuality = false
			void this.runProcessingPass(scheduledPreviewQuality)
		}, delay)
	}

	@Spec('Runs one processing pass and keeps only the latest async result visible.')
	private async runProcessingPass(usePreviewQuality: boolean = false) {
		if (this.loadedImage === null) {
			return
		}
		this.isProcessingPassActive = true
		const ticket = this.processingTicket + 1
		this.processingTicket = ticket
		const snapshotBands = this.bands.map((band) => ({ ...band }))
		const image = this.loadedImage
		const sourceLabel = this.sourceLabel
		const workingSize = this.resolvePreferredWorkingSize(image)
		try {
			const result = await FrequencyImageProcessor.process(image, snapshotBands, workingSize, sourceLabel)
			if (ticket !== this.processingTicket) {
				return
			}
			this.processedImageUrl = result.dataUrl
			this.processedSummary = result.summary
			this.processingStateText = usePreviewQuality ? 'Live preview' : 'Processed'
		} finally {
			this.isProcessingPassActive = false
			if (this.needsAnotherProcessingPass) {
				const queuedPreviewQuality = this.queuedProcessingPreviewQuality
				this.needsAnotherProcessingPass = false
				this.queuedProcessingPreviewQuality = false
				this.scheduleProcessing(true, queuedPreviewQuality)
			}
		}
	}

	@Spec('Reads a browser file into a data URL for preview and FFT processing.')
	private readFileAsDataUrl(file: File): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => {
				const result = reader.result
				if (typeof result === 'string') {
					resolve(result)
					return
				}
				reject(new Error('Expected file reader to produce a data URL string'))
			}
			reader.onerror = () => reject(reader.error ?? new Error('Failed to read image file'))
			reader.readAsDataURL(file)
		})
	}

	@Spec('Creates a loaded HTML image element from a data URL or object URL source.')
	private createLoadedImage(sourceUrl: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve, reject) => {
			const image = new Image()
			image.onload = () => resolve(image)
			image.onerror = () => reject(new Error('Failed to load selected image'))
			image.src = sourceUrl
		})
	}

	@Spec('Chooses the preferred FFT working size based on source image dimensions so large uploads stay responsive.')
	private resolvePreferredWorkingSize(image: HTMLImageElement): number {
		return Math.max(image.naturalWidth, image.naturalHeight) >= 1000 ? 256 : 512
	}

	@Spec('Creates the default multi-band layout with evenly spaced centers and neutral gains.')
	private createDefaultBands(count: number): EqualizerBand[] {
		const colors = ['#82e8ff', '#7bb0ff', '#8f7dff', '#cb78ff', '#ff78ba', '#ff8f71', '#ffbb59', '#d6e661', '#7cf598']
		const bands: EqualizerBand[] = []
		for (let index = 0; index < count; index += 1) {
			bands.push({
				id: index + 1,
				label: `Band ${index + 1}`,
				color: colors[index % colors.length],
				center: Math.pow(10, -2 + ((index + 0.5) / count) * 2),
				gain: 0,
				q: index % 2 === 0 ? 1.2 : 1.8,
			})
		}
		return bands
	}

	@Spec('Constrains editable band values to the safe visible range used by the UI and processor.')
	private clamp(value: number, minimum: number, maximum: number): number {
		return Math.min(maximum, Math.max(minimum, value))
	}
}
