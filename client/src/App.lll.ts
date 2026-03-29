import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Spec } from '@shared/lll.lll'
import './Calculator.lll'

@Spec('Composes the application root layout with background and content.')
@customElement('app-root')
export class App extends LitElement {
	static styles = css`
		:host {
			display: grid;
			height: 100vh;
			place-items: center;
			margin: 0;
			padding: 0;
			color: rgb(210, 210, 210);
			background-image:
				linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
				url('/images/bg70s/2.webp');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			font-family: 'Manrope', 'Segoe UI', system-ui, -apple-system, sans-serif;
			box-sizing: border-box;
		}

		main {
		}

		span[id='example-content'] {
			max-width: 760px;
			padding: 28px;
			border-radius: 16px;
			margin: 8px;
			display: grid;
			gap: 16px;
			margin: 0;
			font-size: clamp(1.4rem, 2.2vw, 2rem);
			line-height: 1.3;
			letter-spacing: -0.01em;
		}

		.controls {
			display: flex;
			justify-content: flex-start;
		}

		button {
			padding: 10px 14px;
			border-radius: 10px;
			border: 1px solid rgb(73 52 22);
			background: linear-gradient(135deg, #4a3e2c, #302213);
			color: white;
			font-weight: 700;
			cursor: pointer;
		}

		.calculator-area {
			display: grid;
			justify-content: center;
		}
	`

	@state()
	private isCalculatorVisible: boolean = false

	@Spec('Toggles calculator panel visibility in the app UI.')
	private toggleCalculator() {
		this.isCalculatorVisible = !this.isCalculatorVisible
	}

	@Spec('Renders the root application composition.')
	render(): TemplateResult {
		return html`
			<main>			
				<span id="example-content">
					<p>
						This is a template for a client-server app with Zod and shared types between client and server, written in LLLTS. Please delete this block and build anything you like instead.
					</p>
					<div class="controls">
						<button @click=${this.toggleCalculator}>
							${this.isCalculatorVisible ? 'Close calculator' : 'Open calculator'}
						</button>
					</div>
					${this.isCalculatorVisible
				? html`<section class="calculator-area"><calculator-panel></calculator-panel></section>`
				: null}
				</span>
			</main>
		`
	}
}
