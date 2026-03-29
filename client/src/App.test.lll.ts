import './App.lll'
import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Bridge } from '@shared/Bridge.lll'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { App } from './App.lll'

@Spec('Renders a playground that calls shared typed API endpoints.')
@customElement('api-playground')
export class AppTest extends LitElement {
	testType = "behavioral"
	private static activeInstance: AppTest | null = null

	@Spec('Tracks the currently connected playground instance for scenario reuse.')
	connectedCallback() {
		super.connectedCallback()
		AppTest.activeInstance = this
	}

	@Spec('Clears tracked playground instance when it disconnects.')
	disconnectedCallback() {
		if (AppTest.activeInstance === this) {
			AppTest.activeInstance = null
		}
		super.disconnectedCallback()
	}


	@Scenario('A greeting via the server')
	static async greetingOfFrankZappa(input = {}, assert: AssertFn): Promise<{ helloResponse: string }> {
		const mounted = await this.getRenderedPlayground()
		const helloInput = mounted.shadowRoot?.querySelector<HTMLInputElement>('input[placeholder="Enter a name"]')
		assert(helloInput !== null && helloInput !== undefined, 'Expected hello name input to be rendered')
		await this.setInputValue(mounted, helloInput, 'Frank Zappa')

		await this.clickButtonByText(mounted, 'Hello')
		await this.waitFor(() => this.readStatusValue(mounted, 'Hello response') === 'Hi, Frank Zappa!', 1200, 20)

		const helloResponse = this.readStatusValue(mounted, 'Hello response')
		assert(helloResponse === 'Hi, Frank Zappa!', 'Expected exactly "Hi, Frank Zappa!"')
		return { helloResponse }
	}

	@Scenario('Multiplies large numbers on the server')
	static async multiplyBigNumbersViaUIControls(input = {}, assert: AssertFn): Promise<{ multiplyResponse: string }> {
		const mounted = await this.getRenderedPlayground()
		const numberInputs = Array.from(mounted.shadowRoot?.querySelectorAll<HTMLInputElement>('input[type="number"]') ?? [])
		assert(numberInputs.length >= 2, 'Expected multiply inputs to be rendered')

		await this.setInputValue(mounted, numberInputs[0], '12345')
		await this.setInputValue(mounted, numberInputs[1], '67890')
		await this.clickButtonByText(mounted, 'Multiply')
		await this.waitFor(
			() => this.readStatusValue(mounted, 'Multiply response') === '12345 × 67890 = 838102050',
			1200,
			20,
		)

		const multiplyResponse = this.readStatusValue(mounted, 'Multiply response')
		assert(
			multiplyResponse === '12345 × 67890 = 838102050',
			'Expected exactly "12345 × 67890 = 838102050"',
		)
		return { multiplyResponse }
	}

	@Spec('Finds the already-rendered behavioral playground element from the live UI.')
	private static async getRenderedPlayground(): Promise<AppTest> {
		await this.waitFor(() => this.findBestRenderedPlayground() !== null, 1200, 20)
		const element = this.findBestRenderedPlayground()
		if (element === null) {
			throw new Error('Expected an already-rendered api-playground element')
		}
		await element.updateComplete
		return element
	}

	@Spec('Selects the best currently rendered playground, preferring visible active instance.')
	private static findBestRenderedPlayground(): AppTest | null {
		if (this.activeInstance !== null && this.activeInstance.isConnected) {
			return this.activeInstance
		}

		const allPlaygrounds = Array.from(document.querySelectorAll<AppTest>('api-playground'))
		const visiblePlayground = allPlaygrounds.find((element) => element.isConnected && element.getClientRects().length > 0)
		if (visiblePlayground !== undefined) {
			return visiblePlayground
		}
		return allPlaygrounds.find((element) => element.isConnected) ?? null
	}

	@Spec('Recognizes Lit template-like render results without using any casts.')
	private static isTemplateLike(value: unknown): value is { strings: readonly string[] } {
		if (typeof value !== 'object' || value === null || Array.isArray(value)) {
			return false
		}

		const candidate = value as { strings?: unknown }
		return Array.isArray(candidate.strings)
	}

	@Spec('Sets an input value and dispatches a user-like input event.')
	private static async setInputValue(root: AppTest, inputElement: HTMLInputElement, value: string) {
		inputElement.value = value
		inputElement.dispatchEvent(new Event('input', { bubbles: true }))
		await root.updateComplete
	}

	@Spec('Clicks a button by visible text content within the playground.')
	private static async clickButtonByText(root: AppTest, text: string) {
		const buttons = Array.from(root.shadowRoot?.querySelectorAll<HTMLButtonElement>('button') ?? [])
		const button = buttons.find((candidate) => candidate.textContent?.trim() === text)
		if (!button) {
			throw new Error(`Button not found: ${text}`)
		}
		button.click()
		await root.updateComplete
	}

	@Spec('Reads the content value of a status panel by its visible label.')
	private static readStatusValue(root: AppTest, label: string): string {
		const statusBlocks = Array.from(root.shadowRoot?.querySelectorAll<HTMLElement>('.status') ?? [])
		for (const block of statusBlocks) {
			const labelElement = block.querySelector<HTMLElement>('.status-label')
			if (labelElement?.textContent?.trim() === label) {
				const valueElements = Array.from(block.children).filter((child) =>
					!(child as HTMLElement).classList.contains('status-label'),
				)
				const valueText = valueElements.map((element) => element.textContent?.trim() ?? '').join(' ').trim()
				return valueText
			}
		}
		throw new Error(`Status block not found: ${label}`)
	}

	@Spec('Polls until predicate returns true or timeout is reached.')
	private static async waitFor(predicate: () => boolean, timeoutMs: number, intervalMs: number) {
		const startTime = Date.now()
		while (Date.now() - startTime < timeoutMs) {
			if (predicate()) {
				return
			}
			await new Promise<void>((resolve) => setTimeout(resolve, intervalMs))
		}
		throw new Error(`Condition was not met within ${timeoutMs}ms`)
	}


	readonly app: App | undefined
	static styles = css`
		:host {
			display: block;
			margin: 0;
			padding: 0;
			color: #f5f7fb;
			font-family: 'Manrope', 'Segoe UI', system-ui, -apple-system, sans-serif;
		}

		main {
			max-width: 900px;
			margin: 0 auto;
			padding: 16px 20px 12px;
			display: grid;
			gap: 24px;
		}

		.hero {
			text-align: center;
		}

		p.lead {
			margin: 0;
			color: rgba(245, 247, 251, 0.82);
		}

		.panel {
			background: rgba(8, 11, 20, 0.7);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 18px;
			padding: 20px;
			display: grid;
			gap: 12px;
			box-shadow: 0 16px 60px rgba(0, 0, 0, 0.35);
		}

		.panel h2 {
			margin: 0;
			font-size: 1.2rem;
			letter-spacing: -0.01em;
		}

		.inputs {
			display: grid;
			gap: 12px;
		}

		.input-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: 12px;
		}

		label {
			display: grid;
			gap: 6px;
			font-size: 0.86rem;
			color: rgba(245, 247, 251, 0.84);
		}

		input {
			width: 100%;
			box-sizing: border-box;
			padding: 10px 12px;
			border-radius: 10px;
			border: 1px solid rgba(255, 255, 255, 0.18);
			background: rgba(255, 255, 255, 0.08);
			color: #f5f7fb;
			font-size: 0.96rem;
		}

		input:focus {
			outline: 2px solid rgba(107, 154, 253, 0.85);
			outline-offset: 1px;
		}

		.actions {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: 16px;
		}

		button {
			width: 100%;
			padding: 14px 16px;
			border-radius: 14px;
			border: 1px solid rgba(255, 255, 255, 0.12);
			background: linear-gradient(135deg, #2e6df6, #6b9afd);
			color: white;
			font-size: 1rem;
			font-weight: 700;
			cursor: pointer;
			transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
		}

		button.secondary {
			background: linear-gradient(135deg, #2ac3a2, #6debc3);
			color: #041015;
			border-color: rgba(255, 255, 255, 0.18);
		}

		button:disabled {
			opacity: 0.65;
			cursor: not-allowed;
			filter: grayscale(0.25);
		}

		button:not(:disabled):hover {
			transform: translateY(-1px);
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
		}

		.status {
			display: grid;
			gap: 8px;
			padding: 12px 14px;
			border-radius: 12px;
			background: rgba(255, 255, 255, 0.06);
			border: 1px solid rgba(255, 255, 255, 0.08);
		}

		.status-label {
			text-transform: uppercase;
			font-size: 0.75rem;
			letter-spacing: 0.1em;
			color: rgba(245, 247, 251, 0.7);
		}

		.error {
			color: #ffd5d5;
			background: rgba(139, 0, 28, 0.24);
			border-color: rgba(255, 120, 141, 0.45);
		}
	`

	private readonly apiBaseUrl = (import.meta.env as ImportMetaEnv & { VITE_API_BASE_URL?: string }).VITE_API_BASE_URL ?? ''

	@state()
	private helloResponse: string = ''

	@state()
	private multiplyResponse: string = ''

	@state()
	private loading: 'hello' | 'multiply' | null = null

	@state()
	private error: string | null = null

	@state()
	private helloNameInput: string = ''

	@state()
	private multiplyAInput: string = ''

	@state()
	private multiplyBInput: string = ''

	constructor() {
		Spec('Initializes randomized playground inputs for hello and multiply requests.')
		super()
		this.helloNameInput = this.randomName()
		this.multiplyAInput = String(this.randomNumber())
		this.multiplyBInput = String(this.randomNumber())
	}

	@Spec('Returns a random name for hello endpoint requests.')
	private randomName(): string {
		const names = ['Ada', 'Lin', 'Nova', 'Riley', 'Sam', 'Indigo', 'Mara', 'Theo', 'Quinn', 'Sage']
		const index = Math.floor(Math.random() * names.length)
		return names[index]
	}

	@Spec('Returns a random integer for multiply endpoint requests.')
	private randomNumber(): number {
		return Math.floor(Math.random() * 10) + 1
	}

	@Spec('Updates the editable name used by the hello request.')
	private onHelloNameInput(event: Event) {
		this.helloNameInput = (event.target as HTMLInputElement).value
	}

	@Spec('Updates the first editable number used by the multiply request.')
	private onMultiplyAInput(event: Event) {
		this.multiplyAInput = (event.target as HTMLInputElement).value
	}

	@Spec('Updates the second editable number used by the multiply request.')
	private onMultiplyBInput(event: Event) {
		this.multiplyBInput = (event.target as HTMLInputElement).value
	}

	@Spec('Calls the hello endpoint and stores the response state.')
	private async callHello() {
		this.loading = 'hello'
		this.error = null
		const name = this.helloNameInput.trim()

		if (!name) {
			this.error = 'Please enter a name.'
			this.loading = null
			return
		}

		try {
			const response = await Bridge.typedFetch('/api/hello', { name }, { baseUrl: this.apiBaseUrl })
			this.helloResponse = response
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Request failed'
		} finally {
			this.loading = null
		}
	}

	@Spec('Calls the multiply endpoint and stores the response state.')
	private async callMultiply() {
		this.loading = 'multiply'
		this.error = null
		const a = Number(this.multiplyAInput)
		const b = Number(this.multiplyBInput)

		if (!Number.isFinite(a) || !Number.isFinite(b)) {
			this.error = 'Please enter valid numbers for multiplication.'
			this.loading = null
			return
		}

		try {
			const response = await Bridge.typedFetch('/api/multiply', { a, b }, { baseUrl: this.apiBaseUrl })
			this.multiplyResponse = `${a} × ${b} = ${response.product}`
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Request failed'
		} finally {
			this.loading = null
		}
	}

	@Spec('Renders the API playground interface and current status values.')
	render(): TemplateResult {
		return html`
			<main>
				<section class="hero">
						<p class="lead">Call the Hello and Multiply endpoints through the shared typed client.</p>
				</section>

				<section class="panel">
					<h2>Try the endpoints</h2>
					<div class="inputs">
						<label>
							Hello name
							<input
								type="text"
								placeholder="Enter a name"
								.value=${this.helloNameInput}
								@input=${this.onHelloNameInput}
							/>
						</label>
						<div class="input-grid">
							<label>
								Multiply A
								<input
									type="number"
									step="any"
									.value=${this.multiplyAInput}
									@input=${this.onMultiplyAInput}
								/>
							</label>
							<label>
								Multiply B
								<input
									type="number"
									step="any"
									.value=${this.multiplyBInput}
									@input=${this.onMultiplyBInput}
								/>
							</label>
						</div>
					</div>
					<div class="actions">
						<button ?disabled=${this.loading !== null} @click=${this.callHello}>
							${this.loading === 'hello' ? 'Calling Hello…' : 'Hello'}
						</button>
						<button class="secondary" ?disabled=${this.loading !== null} @click=${this.callMultiply}>
							${this.loading === 'multiply' ? 'Calculating…' : 'Multiply'}
						</button>
					</div>

					<div class="status">
						<div class="status-label">Hello response</div>
						<div>${this.helloResponse || '—'}</div>
					</div>

					<div class="status">
						<div class="status-label">Multiply response</div>
						<div>${this.multiplyResponse || '—'}</div>
					</div>

					${this.error !== null
				? html`<div class="status error">
								<div class="status-label">Error</div>
								<div>${this.error}</div>
							</div>`
				: null}
				</section>
			</main>
		`
	}
}
