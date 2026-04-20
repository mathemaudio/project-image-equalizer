import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Spec } from '@shared/lll.lll'
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

		.badges {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
		}

		.badge {
			padding: 8px 12px;
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.06);
			border: 1px solid rgba(255, 255, 255, 0.1);
			font-size: 0.84rem;
			color: rgba(233, 239, 255, 0.76);
		}
	`

	@Spec('Renders the app shell and the interactive image equalizer experience.')
	render(): TemplateResult {
		return html`
			<main>
				<header>
					<div class="badges">
						<span class="badge">Client-side only</span>
						<span class="badge">FFT-domain magnitude shaping</span>
						<span class="badge">5 draggable bands by default</span>
					</div>
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
