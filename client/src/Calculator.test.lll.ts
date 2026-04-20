import './Calculator.lll'
import { AssertFn, Scenario, ScenarioParameter, Spec, SubjectFactory, WaitForFn } from '@shared/lll.lll'
import { Calculator } from './Calculator.lll'

@Spec('Exercises calculator behavior through visible UI interactions only.')
export class CalculatorTest {
	testType = 'behavioral'

	@Scenario('12 + 34 = 46')
	static async addsNumbersThroughButtons(subjectFactory: SubjectFactory<Calculator>, scenario: ScenarioParameter): Promise<{ display: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const calculator = await subjectFactory()
		await this.prepareCalculator(calculator, waitFor)
		await this.clickButtonByLabel(calculator, '1')
		await this.clickButtonByLabel(calculator, '2')
		await this.clickButtonByLabel(calculator, '+')
		await this.clickButtonByLabel(calculator, '3')
		await this.clickButtonByLabel(calculator, '4')
		await this.clickButtonByLabel(calculator, '=')

		await waitFor(() => this.readDisplayValue(calculator) === '46', 'Expected calculator display to settle at 46')
		const display = this.readDisplayValue(calculator)
		assert(display === '46', 'Expected display to equal 46')
		return { display }
	}

	@Scenario('98765 * 43210 = 4267635650')
	static async multipliesLargeNumbersThroughButtons(subjectFactory: SubjectFactory<Calculator>, scenario: ScenarioParameter): Promise<{ display: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const calculator = await subjectFactory()
		await this.prepareCalculator(calculator, waitFor)
		for (const digit of ['9', '8', '7', '6', '5']) {
			await this.clickButtonByLabel(calculator, digit)
		}
		await this.clickButtonByLabel(calculator, '*')
		for (const digit of ['4', '3', '2', '1', '0']) {
			await this.clickButtonByLabel(calculator, digit)
		}
		await this.clickButtonByLabel(calculator, '=')

		await waitFor(() => this.readDisplayValue(calculator) === '4267635650', 'Expected calculator display to settle at 4267635650')
		const display = this.readDisplayValue(calculator)
		assert(display === '4267635650', 'Expected display to equal 4267635650')
		return { display }
	}

	@Scenario('12345 / 0 = Error')
	static async divideByZeroShowsError(subjectFactory: SubjectFactory<Calculator>, scenario: ScenarioParameter): Promise<{ display: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const calculator = await subjectFactory()
		await this.prepareCalculator(calculator, waitFor)
		for (const digit of ['1', '2', '3', '4', '5']) {
			await this.clickButtonByLabel(calculator, digit)
		}
		await this.clickButtonByLabel(calculator, '/')
		await this.clickButtonByLabel(calculator, '0')
		await this.clickButtonByLabel(calculator, '=')

		await waitFor(() => this.readDisplayValue(calculator) === 'Error', 'Expected calculator display to settle at Error')
		const display = this.readDisplayValue(calculator)
		assert(display === 'Error', 'Expected Error when dividing by zero')
		return { display }
	}

	@Scenario('keyboard typing attempt does not change display')
	static async ignoresKeyboardTypingInDisplay(subjectFactory: SubjectFactory<Calculator>, scenario: ScenarioParameter): Promise<{ beforeTyping: string, afterTyping: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const calculator = await subjectFactory()
		await this.prepareCalculator(calculator, waitFor)
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
	static async handlesMemoryWorkflow(subjectFactory: SubjectFactory<Calculator>, scenario: ScenarioParameter): Promise<{ recalledBeforeClear: string, recalledAfterClear: string }> {
		const assert: AssertFn = scenario.assert
		const waitFor: WaitForFn = scenario.waitFor
		const calculator = await subjectFactory()
		await this.prepareCalculator(calculator, waitFor)
		await this.clickButtonByLabel(calculator, '5')
		await this.clickButtonByLabel(calculator, '0')
		await this.clickButtonByLabel(calculator, 'M+')

		await this.clickButtonByLabel(calculator, '8')
		await this.clickButtonByLabel(calculator, 'M-')

		await this.clickButtonByLabel(calculator, 'MR')
		await waitFor(() => this.readDisplayValue(calculator) === '42', 'Expected memory recall to show 42 before clear')
		const recalledBeforeClear = this.readDisplayValue(calculator)

		await this.clickButtonByLabel(calculator, 'MC')
		await this.clickButtonByLabel(calculator, 'MR')
		await waitFor(() => this.readDisplayValue(calculator) === '0', 'Expected memory recall to show 0 after clear')
		const recalledAfterClear = this.readDisplayValue(calculator)

		assert(recalledBeforeClear === '42', 'Expected memory recall to equal 42 before clear')
		assert(recalledAfterClear === '0', 'Expected memory recall to equal 0 after clear')
		return { recalledBeforeClear, recalledAfterClear }
	}

	@Spec('Waits for the paired calculator host to render and resets it through visible controls.')
	private static async prepareCalculator(calculator: Calculator, waitFor: WaitForFn): Promise<void> {
		await waitFor(() => calculator.shadowRoot !== null, 'Expected calculator-panel shadow DOM to render')
		await calculator.updateComplete
		await this.clickButtonByLabel(calculator, 'C')
		await waitFor(() => this.readDisplayValue(calculator) === '0', 'Expected calculator reset to restore display to 0')
	}

	@Spec('Clicks a calculator button by its exact visible label.')
	private static async clickButtonByLabel(calculator: Calculator, label: string): Promise<void> {
		const buttons = Array.from(calculator.shadowRoot?.querySelectorAll<HTMLButtonElement>('button') ?? [])
		const button = buttons.find(candidate => candidate.textContent?.trim() === label)
		if (button === undefined) {
			throw new Error(`Button not found: ${label}`)
		}
		button.click()
		await calculator.updateComplete
	}

	@Spec('Reads the current value shown in the calculator display.')
	private static readDisplayValue(calculator: Calculator): string {
		const display = calculator.shadowRoot?.querySelector<HTMLInputElement>('input.display')
		if (display === null || display === undefined) {
			throw new Error('Calculator display not found')
		}
		return display.value
	}
}
