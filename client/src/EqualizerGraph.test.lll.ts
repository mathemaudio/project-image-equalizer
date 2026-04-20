import './EqualizerGraph.lll'
import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { EqualizerGraph } from './EqualizerGraph.lll'

@Spec('Exercises visible graph interaction for equalizer band dragging.')
@customElement('equalizer-graph-test-panel')
export class EqualizerGraphTest extends LitElement {
	testType = "behavioral"
	private static activeInstance: EqualizerGraphTest | null = null

	static styles = css`
		:host {
			display: block;
			padding: 8px;
		}
	`

	@Spec('Tracks the currently connected equalizer graph test panel for scenario lookup.')
	connectedCallback() {
		super.connectedCallback()
		EqualizerGraphTest.activeInstance = this
	}

	@Spec('Clears the tracked graph test panel when it disconnects.')
	disconnectedCallback() {
		if (EqualizerGraphTest.activeInstance === this) {
			EqualizerGraphTest.activeInstance = null
		}
		super.disconnectedCallback()
	}

	@Spec('Renders a visible equalizer graph with two editable bands.')
	render(): TemplateResult {
		return html`
			<equalizer-graph
				.bands=${[
					{ id: 1, label: 'Band 1', color: '#82e8ff', center: 0.12, gain: 3, q: 1.4 },
					{ id: 2, label: 'Band 2', color: '#ff8f71', center: 0.45, gain: -4, q: 1.8 },
				]}
				.selectedBandId=${1}
			></equalizer-graph>
		`
	}

	@Scenario('dragging a visible graph handle emits band selection and position changes')
	static async dragsGraphHandle(input = {}, assert: AssertFn): Promise<{ selectedBandId: number, changedBandId: number }> {
		const graph = await this.getRenderedGraph()
		const svgElement = graph.shadowRoot?.querySelector('svg')
		assert(svgElement instanceof SVGElement, 'Expected equalizer graph SVG to render')
		Object.defineProperty(svgElement, 'getBoundingClientRect', {
			value: () => new DOMRect(0, 0, 760, 360),
		})

		let selectedBandId = 0
		let changedBandId = 0
		graph.addEventListener('band-select', (event: Event) => {
			const customEvent = event as CustomEvent<{ id: number }>
			selectedBandId = customEvent.detail.id
		})
		graph.addEventListener('band-change', (event: Event) => {
			const customEvent = event as CustomEvent<{ id: number, center: number, gain: number }>
			changedBandId = customEvent.detail.id
		})

		const handle = graph.shadowRoot?.querySelector('circle')
		const shell = graph.shadowRoot?.querySelector('button.graph-shell')
		assert(handle instanceof SVGCircleElement, 'Expected at least one draggable band handle to render')
		assert(shell instanceof HTMLButtonElement, 'Expected graph shell button to render')

		handle.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: 130, clientY: 150 }))
		shell.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 240, clientY: 96 }))
		shell.dispatchEvent(new MouseEvent('pointerup', { bubbles: true, clientX: 240, clientY: 96 }))
		await graph.updateComplete

		assert(selectedBandId === 1, 'Expected pointer interaction to select the first band')
		assert(changedBandId === 1, 'Expected pointer interaction to emit a change for the first band')
		return { selectedBandId, changedBandId }
	}

	@Spec('Finds the visible equalizer graph instance rendered by the active test panel.')
	private static async getRenderedGraph(): Promise<EqualizerGraph> {
		await this.waitFor(() => this.findBestRenderedPanel() !== null, 1200, 20)
		const panel = this.findBestRenderedPanel()
		if (panel === null) {
			throw new Error('Expected an already-rendered equalizer-graph-test-panel element')
		}
		await panel.updateComplete
		const graph = panel.shadowRoot?.querySelector<EqualizerGraph>('equalizer-graph')
		if (graph === null || graph === undefined) {
			throw new Error('Expected equalizer-graph to be rendered inside equalizer-graph-test-panel')
		}
		await graph.updateComplete
		return graph
	}

	@Spec('Selects the best currently rendered equalizer graph test panel.')
	private static findBestRenderedPanel(): EqualizerGraphTest | null {
		if (this.activeInstance !== null && this.activeInstance.isConnected) {
			return this.activeInstance
		}

		const panels = Array.from(document.querySelectorAll<EqualizerGraphTest>('equalizer-graph-test-panel'))
		const visiblePanel = panels.find((element) => element.isConnected && element.getClientRects().length > 0)
		if (visiblePanel !== undefined) {
			return visiblePanel
		}
		return panels.find((element) => element.isConnected) ?? null
	}

	@Spec('Polls until a graph condition succeeds or the timeout is reached.')
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
}
