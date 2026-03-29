import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDir = path.resolve(__dirname, '..')
const binDir = path.join(clientDir, 'node_modules', '.bin')
const exeSuffix = process.platform === 'win32' ? '.cmd' : ''

function spawnNamed(name, command, args) {
	const child = spawn(command, args, {
		cwd: clientDir,
		stdio: 'inherit'
	})

	child.on('exit', (code, signal) => {
		if (shuttingDown) {
			return
		}

		shuttingDown = true
		stopChildren(child.pid)

		if (signal) {
			process.kill(process.pid, signal)
			return
		}

		process.exit(code ?? 0)
	})

	child.on('error', (error) => {
		console.error(`[${name}] failed to start`, error)
		if (!shuttingDown) {
			shuttingDown = true
			stopChildren(child.pid)
			process.exit(1)
		}
	})

	return child
}

const tscPath = path.join(binDir, `tsc${exeSuffix}`)
const vitePath = path.join(binDir, `vite${exeSuffix}`)
let shuttingDown = false

const children = [
	spawnNamed('tsc', tscPath, ['-w', '--preserveWatchOutput']),
	spawnNamed('vite', vitePath, [])
]

function stopChildren(skipPid) {
	for (const child of children) {
		if (!child.pid || child.pid === skipPid) {
			continue
		}

		child.kill('SIGTERM')
	}
}

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.on(signal, () => {
		if (shuttingDown) {
			return
		}

		shuttingDown = true
		stopChildren()
		process.exit(0)
	})
}
