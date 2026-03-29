import './Calculator.lll'
import { LitElement, css, html, render, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { AssertFn, Scenario, Spec } from '@shared/lll.lll'
import { Calculator } from './Calculator.lll'

@Spec('Exercises calculator behavior through visible UI interactions only.')
@customElement('calculator-test-panel')
export class CalculatorTest extends LitElement {
	testType = "behavioral"
	private static activeInstance: CalculatorTest | null = null

	@Spec('Tracks the currently connected calculator test panel for scenario reuse.')
	connectedCallback() {
		super.connectedCallback()
		CalculatorTest.activeInstance = this
	}

	@Spec('Clears tracked calculator test panel when it disconnects.')
	disconnectedCallback() {
		if (CalculatorTest.activeInstance === this) {
			CalculatorTest.activeInstance = null
		}
		super.disconnectedCallback()
	}

	static styles = css`
		:host {
			display: block;
			padding: 8px;
		}
	`

	@Spec('Renders the calculator panel used by behavioral scenarios.')
	render(): TemplateResult {
		return html`<div id="calculator-host"><calculator-panel></calculator-panel></div>`
	}

	@Scenario('12 + 34 = 46')
	static async addsNumbersThroughButtons(input = {}, assert: AssertFn): Promise<{ display: string }> {
		const calculator = await this.getRenderedCalculator()
		await this.resetCalculatorState(calculator)
		await this.clickButtonByLabel(calculator, '1')
		await this.clickButtonByLabel(calculator, '2')
		await this.clickButtonByLabel(calculator, '+')
		await this.clickButtonByLabel(calculator, '3')
		await this.clickButtonByLabel(calculator, '4')
		await this.clickButtonByLabel(calculator, '=')

		await this.waitFor(() => this.readDisplayValue(calculator) === '46', 1200, 20)
		const display = this.readDisplayValue(calculator)
		assert(display === '46', 'Expected display to equal 46')
		return { display }
	}

	@Scenario('98765 * 43210 = 4267635650')
	static async multipliesLargeNumbersThroughButtons(input = {}, assert: AssertFn): Promise<{ display: string }> {
		const calculator = await this.getRenderedCalculator()
		await this.resetCalculatorState(calculator)
		for (const digit of ['9', '8', '7', '6', '5']) {
			await this.clickButtonByLabel(calculator, digit)
		}
		// assert(22 == 11_1 * 2, 'I am only a test, never mind me')
		await this.clickButtonByLabel(calculator, '*')
		for (const digit of ['4', '3', '2', '1', '0']) {
			await this.clickButtonByLabel(calculator, digit)
		}
		await this.clickButtonByLabel(calculator, '=')

		await this.waitFor(() => this.readDisplayValue(calculator) === '4267635650', 1200, 20)
		const display = this.readDisplayValue(calculator)
		assert(display === '4267635650', 'Expected display to equal 4267635650')
		return { display }
	}

	@Scenario('12345 / 0 = Error')
	static async divideByZeroShowsError(input = {}, assert: AssertFn): Promise<{ display: string }> {
		const calculator = await this.getRenderedCalculator()
		await this.resetCalculatorState(calculator)
		for (const digit of ['1', '2', '3', '4', '5']) {
			await this.clickButtonByLabel(calculator, digit)
		}
		await this.clickButtonByLabel(calculator, '/')
		await this.clickButtonByLabel(calculator, '0')
		await this.clickButtonByLabel(calculator, '=')

		await this.waitFor(() => this.readDisplayValue(calculator) === 'Error', 1200, 20)
		const display = this.readDisplayValue(calculator)
		assert(display === 'Error', 'Expected Error when dividing by zero')
		return { display }
	}

	@Scenario('keyboard typing attempt does not change display')
	static async ignoresKeyboardTypingInDisplay(
		input = {},
		assert: AssertFn
	): Promise<{ beforeTyping: string, afterTyping: string }> {
		const calculator = await this.getRenderedCalculator()
		await this.resetCalculatorState(calculator)
		await this.clickButtonByLabel(calculator, '7')
		const displayInput = calculator.shadowRoot?.querySelector<HTMLInputElement>('input.display')
		assert(displayInput !== null && displayInput !== undefined, 'Expected calculator display input to exist')

		const beforeTyping = this.readDisplayValue(calculator)
		displayInput.focus()
		displayInput.dispatchEvent(new KeyboardEvent('keydown', { key: '9', bubbles: true, cancelable: true }))
		displayInput.dispatchEvent(new Event('beforeinput', { bubbles: true, cancelable: true }))
		displayInput.dispatchEvent(new Event('input', { bubbles: true }))
		await calculator.updateComplete

		const afterTyping = this.readDisplayValue(calculator)
		assert(beforeTyping === '7', 'Expected display setup value to be 7')
		assert(afterTyping === '7', 'Expected keyboard typing attempt to not alter display')
		return { beforeTyping, afterTyping }
	}

	@Scenario('memory workflow')
	static async handlesMemoryWorkflow(
		input = {},
		assert: AssertFn
	): Promise<{ recalledBeforeClear: string, recalledAfterClear: string }> {
		const calculator = await this.getRenderedCalculator()
		await this.resetCalculatorState(calculator)
		await this.clickButtonByLabel(calculator, '5')
		await this.clickButtonByLabel(calculator, '0')
		await this.clickButtonByLabel(calculator, 'M+')

		await this.clickButtonByLabel(calculator, '8')
		await this.clickButtonByLabel(calculator, 'M-')

		await this.clickButtonByLabel(calculator, 'MR')
		await this.waitFor(() => this.readDisplayValue(calculator) === '42', 1200, 20)
		const recalledBeforeClear = this.readDisplayValue(calculator)

		await this.clickButtonByLabel(calculator, 'MC')
		await this.clickButtonByLabel(calculator, 'MR')
		await this.waitFor(() => this.readDisplayValue(calculator) === '0', 1200, 20)
		const recalledAfterClear = this.readDisplayValue(calculator)

		assert(recalledBeforeClear === '42', 'Expected memory recall to equal 42 before clear')
		assert(recalledAfterClear === '0', 'Expected memory recall to equal 0 after clear')
		return { recalledBeforeClear, recalledAfterClear }
	}

	@Spec('Finds the on-screen calculator and resets it in place before each scenario.')
	private static async getRenderedCalculator(): Promise<Calculator> {
		await this.waitFor(() => this.findBestRenderedTestPanel() !== null, 1200, 20)
		const panel = this.findBestRenderedTestPanel()
		if (!panel) {
			throw new Error('Expected an already-rendered calculator-test-panel element')
		}
		this.removeOtherTestPanels(panel)
		await panel.updateComplete
		const host = panel.shadowRoot?.querySelector<HTMLElement>('#calculator-host')
		if (!host) {
			throw new Error('Calculator host not found in rendered calculator-test-panel')
		}
		render(html``, host)
		render(html`<calculator-panel></calculator-panel>`, host)
		const calculator = host.querySelector<Calculator>('calculator-panel')
		if (!calculator) {
			throw new Error('Failed to render calculator-panel in calculator host')
		}
		await calculator.updateComplete
		this.removeOtherCalculators(calculator)
		return calculator
	}

	@Spec('Resets calculator through visible controls so scenarios do not rely on prior state.')
	private static async resetCalculatorState(calculator: Calculator) {
		await this.clickButtonByLabel(calculator, 'C')
		await this.waitFor(() => this.readDisplayValue(calculator) === '0', 1200, 20)
	}

	@Spec('Selects the best currently rendered calculator test panel, preferring visible active instance.')
	private static findBestRenderedTestPanel(): CalculatorTest | null {
		if (this.activeInstance !== null && this.activeInstance.isConnected) {
			return this.activeInstance
		}

		const allPanels = Array.from(document.querySelectorAll<CalculatorTest>('calculator-test-panel'))
		const visiblePanel = allPanels.find((element) => element.isConnected && element.getClientRects().length > 0)
		if (visiblePanel !== undefined) {
			return visiblePanel
		}
		return allPanels.find((element) => element.isConnected) ?? null
	}

	@Spec('Removes duplicate calculator test panels so only the active panel remains.')
	private static removeOtherTestPanels(activePanel: CalculatorTest) {
		const allPanels = Array.from(document.querySelectorAll<CalculatorTest>('calculator-test-panel'))
		for (const panel of allPanels) {
			if (panel !== activePanel) {
				panel.remove()
			}
		}
	}

	@Spec('Removes duplicate calculator elements and keeps the active scenario calculator only.')
	private static removeOtherCalculators(activeCalculator: Calculator) {
		const allCalculators = this.findAllCalculators(document)
		for (const calculator of allCalculators) {
			if (calculator !== activeCalculator) {
				calculator.remove()
			}
		}
	}

	@Spec('Collects all calculator-panel elements from document and open shadow roots.')
	private static findAllCalculators(root: Document | ShadowRoot): Calculator[] {
		const calculators = Array.from(root.querySelectorAll<Calculator>('calculator-panel'))
		const elements = Array.from(root.querySelectorAll<HTMLElement>('*'))
		for (const element of elements) {
			const shadowRoot = element.shadowRoot
			if (shadowRoot !== null) {
				calculators.push(...this.findAllCalculators(shadowRoot))
			}
		}
		return calculators
	}

	@Spec('Clicks a calculator button by its exact visible label.')
	private static async clickButtonByLabel(calculator: Calculator, label: string) {
		const buttons = Array.from(calculator.shadowRoot?.querySelectorAll<HTMLButtonElement>('button') ?? [])
		const button = buttons.find((candidate) => candidate.textContent?.trim() === label)
		if (!button) {
			throw new Error(`Button not found: ${label}`)
		}
		button.click()
		await calculator.updateComplete
	}

	@Spec('Reads the current value shown in the calculator display.')
	private static readDisplayValue(calculator: Calculator): string {
		const display = calculator.shadowRoot?.querySelector<HTMLInputElement>('input.display')
		if (!display) {
			throw new Error('Calculator display not found')
		}
		return display.value
	}

	@Spec('Polls until a condition succeeds or a timeout is reached.')
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
