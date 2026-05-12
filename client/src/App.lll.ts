import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Spec } from './lll.lll'
import './ImageEqualizer.lll'

@Spec('Composes the application shell for the browser-only interactive frequency-domain image equalizer.')
@customElement('app-root')
export class App extends LitElement {
	static styles = css`
		:host {
			display: block;
			min-height: 100vh;
			padding: 28px;
			color: #eef4ff;
			background:
				radial-gradient(circle at top, rgba(93, 118, 255, 0.22), transparent 42%),
				linear-gradient(180deg, #090d17 0%, #0d1221 55%, #090d17 100%);
			font-family: 'Manrope', 'Segoe UI', system-ui, -apple-system, sans-serif;
		}

		.lll-corner-link {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 80px;
			height: 80px;
			display: block;
			clip-path: polygon(0 100%, 0 0, 100% 100%);
			background: linear-gradient(135deg, rgba(64, 234, 255, 0.96), rgba(34, 98, 214, 0.96));
			box-shadow: 0 0 20px rgba(64, 234, 255, 0.26);
			text-decoration: none;
			color: #e8fbff;
			z-index: 20;
			transition: filter 0.12s ease, transform 0.12s ease;
			isolation: isolate;
		}

		.lll-corner-link::before {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(135deg, rgba(232, 251, 255, 0.34), rgba(255, 255, 255, 0));
			clip-path: inherit;
			pointer-events: none;
		}

		.lll-corner-link:hover,
		.lll-corner-link:focus-visible {
			filter: brightness(1.08);
			transform: translateY(-1px);
		}

		.lll-corner-link-text {
			position: absolute;
			left: -5px;
			bottom: 45px;
			width: 74px;
			font-size: 0.62rem;
			font-family: 'Orbitron', 'Inter', sans-serif;
			font-weight: 700;
			line-height: 1.15;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			text-align: center;
			color: inherit;
			transform: rotate(45deg);
			transform-origin: bottom left;
			text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
			pointer-events: none;
		}

		main {
			max-width: 1380px;
			margin: 0 auto;
			display: grid;
			gap: 20px;
		}

		header {
			display: grid;
			gap: 10px;
		}

		h1 {
			margin: 0;
			font-size: clamp(2rem, 4vw, 3.5rem);
			letter-spacing: -0.04em;
		}

		.lead {
			max-width: 820px;
			font-size: 1.05rem;
			line-height: 1.6;
			color: rgba(233, 239, 255, 0.82);
		}

	`

	@Spec('Renders the app shell, the fixed LLL corner link, and the interactive image equalizer experience.')
	render(): TemplateResult {
		return html`
			<a class="lll-corner-link" href="https://evidype.com" target="_blank" rel="noreferrer" aria-label="Made with Evidype">
				<span class="lll-corner-link-text">Made with Evidype</span>
			</a>
			<main>
				<header>
					<h1>Interactive Frequency-Domain Image Equalizer</h1>
					<p class="lead">
						Upload any image, sculpt overlapping frequency bands like a parametric EQ, and watch the processed version respond live below the original.
					</p>
				</header>
				<image-equalizer></image-equalizer>
			</main>
		`
	}
}
