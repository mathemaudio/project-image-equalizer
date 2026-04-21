import './EqualizerGraph.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from '@shared/lll.lll'
import type { EqualizerBand } from './EqualizerBand.lll'
import { EqualizerGraph } from './EqualizerGraph.lll'

@Spec('Exercises the equalizer graph through visible drag-target interactions only.')
export class EqualizerGraphTest {
	testType = 'behavioral'

	@Scenario('clicking a different band handle moves the visible width handles to that band')
	static async selectsAnotherBandFromItsHandle(subjectFactory: SubjectFactory<EqualizerGraph>, scenario: ScenarioParameter): Promise<{ beforeLabel: string, afterLabel: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const graph = await subjectFactory()
		await this.prepareMountedGraph(graph, waitFor)
		graph.bands = this.createBands()
		graph.selectedBandId = 3
		graph.spectrogramProfile = Array.from({ length: 24 }, (_, index) => (index % 5 === 0 ? 0.85 : 0.18 + (index / 40)))
		await graph.updateComplete
		await waitFor(() => this.readVisibleWidthHandleLabel(graph) === 'Band 3 width handles', 'Expected Band 3 width handles to be visible before interaction')
		const beforeLabel = this.readVisibleWidthHandleLabel(graph)
		const handles = Array.from(graph.shadowRoot?.querySelectorAll<SVGCircleElement>('circle') ?? [])
		const bandTwoHandle = handles[1]
		assert(bandTwoHandle !== undefined, 'Expected a visible drag handle for Band 2')
		bandTwoHandle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 1, clientX: 240, clientY: 120 }))
		await graph.updateComplete
		await waitFor(() => this.readVisibleWidthHandleLabel(graph) === 'Band 2 width handles', 'Expected clicking the Band 2 handle to move width handles onto Band 2')
		const afterLabel = this.readVisibleWidthHandleLabel(graph)
		const backdrop = graph.shadowRoot?.querySelector<SVGPathElement>('path[aria-label="Live FFT spectrum backdrop"]')

		assert(beforeLabel === 'Band 3 width handles', 'Expected Band 3 to start selected for direct-width editing')
		assert(afterLabel === 'Band 2 width handles', 'Expected the clicked Band 2 handle to become the visible selected band')
		assert(backdrop !== null && backdrop !== undefined, 'Expected the graph to render a faint live FFT backdrop path behind the equalizer bands')
		return { beforeLabel, afterLabel }
	}

	@Spec('Waits for the graph host shadow DOM to render.')
	private static async prepareMountedGraph(graph: EqualizerGraph, waitFor: WaitForFn): Promise<void> {
		await waitFor(() => graph.shadowRoot !== null, 'Expected equalizer-graph shadow DOM to render')
		await graph.updateComplete
	}

	@Spec('Creates a compact visible band layout for graph interaction scenarios.')
	private static createBands(): EqualizerBand[] {
		return [
			{ id: 1, label: 'Band 1', color: '#82e8ff', center: 0.08, gain: -4, q: 3.3 },
			{ id: 2, label: 'Band 2', color: '#7bb0ff', center: 0.22, gain: 6, q: 3.3 },
			{ id: 3, label: 'Band 3', color: '#8f7dff', center: 0.55, gain: 0, q: 3.3 },
		]
	}

	@Spec('Reads the currently visible width-handle group label for the selected band.')
	private static readVisibleWidthHandleLabel(graph: EqualizerGraph): string {
		const group = graph.shadowRoot?.querySelector<SVGGElement>('g[aria-label$="width handles"]')
		if (group === null || group === undefined) {
			throw new Error('Visible width-handle group not found')
		}
		return group.getAttribute('aria-label') ?? ''
	}
}
