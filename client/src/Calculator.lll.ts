import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Spec } from '@shared/lll.lll'

@Spec('Renders a two-operand calculator with classic memory controls.')
@customElement('calculator-panel')
export class Calculator extends LitElement {
	static styles = css`
		:host {
			display: block;
			max-width: 320px;
			padding: 14px;
			border-radius: 14px;
			border: 1px solid rgba(255, 255, 255, 0.16);
			background: rgba(9, 14, 24, 0.78);
			box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
		}

		.display {
			width: 100%;
			box-sizing: border-box;
			padding: 10px 12px;
			margin-bottom: 10px;
			border-radius: 10px;
			border: 1px solid rgba(255, 255, 255, 0.25);
			background: rgba(255, 255, 255, 0.1);
			color: #f8fbff;
			font-size: 1.25rem;
			text-align: right;
		}

		.memory,
		.pad {
			display: grid;
			gap: 8px;
		}

		.memory {
			grid-template-columns: repeat(4, 1fr);
			margin-bottom: 8px;
		}

		.pad {
			grid-template-columns: repeat(4, 1fr);
		}

		button {
			padding: 10px 8px;
			border: 1px solid rgba(255, 255, 255, 0.18);
			border-radius: 10px;
			background: rgba(255, 255, 255, 0.1);
			color: #eef4ff;
			font-size: 0.95rem;
			font-weight: 700;
			cursor: pointer;
		}

		button.operator,
		button.equals {
			background: linear-gradient(135deg, #2e6df6, #6b9afd);
		}

		button.clear {
			background: linear-gradient(135deg, #c63543, #ef5b67);
		}
	`

	@state()
	private displayValue: string = '0'

	@state()
	private firstOperand: number | null = null

	@state()
	private pendingOperator: '+' | '-' | '*' | '/' | null = null

	@state()
	private awaitingSecondOperand: boolean = false

	@state()
	private resultShown: boolean = false

	@state()
	private memoryValue: number = 0

	@Spec('Renders the calculator keypad and display.')
	render(): TemplateResult {
		return html`
			<input
				class="display"
				aria-label="Calculator display"
				readonly
				.value=${this.displayValue}
				@keydown=${this.blockKeyboardEditing}
				@beforeinput=${this.blockKeyboardEditing}
			/>
			<div class="memory">
				<button @click=${this.onMemoryAdd}>M+</button>
				<button @click=${this.onMemorySubtract}>M-</button>
				<button @click=${this.onMemoryClear}>MC</button>
				<button @click=${this.onMemoryRecall}>MR</button>
			</div>
			<div class="pad">
				${this.renderDigitButton('7')}
				${this.renderDigitButton('8')}
				${this.renderDigitButton('9')}
				${this.renderOperatorButton('/')}
				${this.renderDigitButton('4')}
				${this.renderDigitButton('5')}
				${this.renderDigitButton('6')}
				${this.renderOperatorButton('*')}
				${this.renderDigitButton('1')}
				${this.renderDigitButton('2')}
				${this.renderDigitButton('3')}
				${this.renderOperatorButton('-')}
				${this.renderDigitButton('0')}
				<button class="equals" @click=${this.onEquals}>=</button>
				<button class="operator" @click=${() => this.onOperator('+')}>+</button>
				<button class="clear" @click=${this.onClearAll}>C</button>
			</div>
		`
	}

	@Spec('Prevents keyboard edits in the display field.')
	private blockKeyboardEditing(event: Event) {
		event.preventDefault()
	}

	@Spec('Renders a keypad digit button.')
	private renderDigitButton(digit: string): TemplateResult {
		return html`<button @click=${() => this.onDigit(digit)}>${digit}</button>`
	}

	@Spec('Renders an operator button for two-operand calculations.')
	private renderOperatorButton(operator: '+' | '-' | '*' | '/'): TemplateResult {
		return html`<button class="operator" @click=${() => this.onOperator(operator)}>${operator}</button>`
	}

	@Spec('Appends a digit to the current display or starts a fresh operand.')
	private onDigit(digit: string) {
		if (this.displayValue === 'Error') {
			this.resetExpression()
		}

		if (this.resultShown) {
			this.resetExpression()
			this.displayValue = digit
			return
		}

		if (this.awaitingSecondOperand) {
			this.displayValue = digit
			this.awaitingSecondOperand = false
			return
		}

		this.displayValue = this.displayValue === '0' ? digit : `${this.displayValue}${digit}`
	}

	@Spec('Queues an arithmetic operation or chains it with the current value.')
	private onOperator(operator: '+' | '-' | '*' | '/') {
		if (this.displayValue === 'Error') {
			return
		}

		const currentValue = this.readDisplayNumber()
		if (currentValue === null) {
			return
		}

		if (this.firstOperand === null) {
			this.firstOperand = currentValue
		} else if (this.pendingOperator !== null && this.awaitingSecondOperand === false) {
			const nextValue = this.calculate(this.firstOperand, currentValue, this.pendingOperator)
			if (nextValue === null) {
				this.setErrorState()
				return
			}
			this.firstOperand = nextValue
			this.displayValue = this.formatNumber(nextValue)
		}

		this.pendingOperator = operator
		this.awaitingSecondOperand = true
		this.resultShown = false
	}

	@Spec('Evaluates the pending two-operand operation and shows the result.')
	private onEquals() {
		if (this.pendingOperator === null || this.firstOperand === null || this.awaitingSecondOperand === true) {
			return
		}

		const secondOperand = this.readDisplayNumber()
		if (secondOperand === null) {
			return
		}

		const result = this.calculate(this.firstOperand, secondOperand, this.pendingOperator)
		if (result === null) {
			this.setErrorState()
			return
		}

		this.displayValue = this.formatNumber(result)
		this.firstOperand = null
		this.pendingOperator = null
		this.awaitingSecondOperand = false
		this.resultShown = true
	}

	@Spec('Adds the visible display number to calculator memory.')
	private onMemoryAdd() {
		const currentValue = this.readDisplayNumber()
		if (currentValue === null) {
			return
		}
		this.memoryValue += currentValue
		this.resultShown = true
	}

	@Spec('Subtracts the visible display number from calculator memory.')
	private onMemorySubtract() {
		const currentValue = this.readDisplayNumber()
		if (currentValue === null) {
			return
		}
		this.memoryValue -= currentValue
		this.resultShown = true
	}

	@Spec('Clears memory back to zero.')
	private onMemoryClear() {
		this.memoryValue = 0
	}

	@Spec('Resets the entire calculator including expression and memory state.')
	private onClearAll() {
		this.memoryValue = 0
		this.resetExpression()
	}

	@Spec('Recalls memory into the display field.')
	private onMemoryRecall() {
		this.displayValue = this.formatNumber(this.memoryValue)
		this.awaitingSecondOperand = false
		this.resultShown = true
	}

	@Spec('Converts the display to a finite number when possible.')
	private readDisplayNumber(): number | null {
		if (this.displayValue === 'Error') {
			return null
		}

		const value = Number(this.displayValue)
		if (!Number.isFinite(value)) {
			return null
		}
		return value
	}

	@Spec('Applies one arithmetic operation for two operands.')
	private calculate(first: number, second: number, operator: '+' | '-' | '*' | '/'): number | null {
		if (operator === '+') {
			return first + second
		}
		if (operator === '-') {
			return first - second
		}
		if (operator === '*') {
			return first * second
		}
		if (second === 0) {
			return null
		}
		return first / second
	}

	@Spec('Formats finite numbers for display output.')
	private formatNumber(value: number): string {
		return Number.isInteger(value) ? String(value) : String(value)
	}

	@Spec('Resets expression state to accept a fresh input value.')
	private resetExpression() {
		this.displayValue = '0'
		this.firstOperand = null
		this.pendingOperator = null
		this.awaitingSecondOperand = false
		this.resultShown = false
	}

	@Spec('Marks calculator display with an Error and clears pending operation state.')
	private setErrorState() {
		this.displayValue = 'Error'
		this.firstOperand = null
		this.pendingOperator = null
		this.awaitingSecondOperand = false
		this.resultShown = true
	}
}
