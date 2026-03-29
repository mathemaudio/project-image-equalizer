import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
	resolve: {
		alias: {
			'@shared': path.resolve(__dirname, '../shared/src')
		}
	},
	server: {
		port: 26881,
		proxy: {
			'/api': 'http://localhost:26882'
		}
	}
})
