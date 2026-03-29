import { html, render } from 'lit'
import { Spec } from '@shared/lll.lll'
import './App.lll'

@Spec('Bootstraps the client app by rendering app-root into the app container')
export class Start {
	readonly root: HTMLElement | null


	constructor() {
		Spec('Finds #app, renders <app-root> into it when present or logs an error')
		this.root = document.querySelector<HTMLElement>('#app')
		if (this.root !== null) {
			render(html`<app-root></app-root>`, this.root)
		} else {
			console.error('Root container #app not found')
		}
	}
}

new Start()
