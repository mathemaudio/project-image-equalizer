module.exports = {
	apps: [
		{
			name: 'project-efficient-cat-8i-server',
			script: 'npx',
			args: 'tsx watch src/Main.lll.ts',
			watch: false, // tsx watch handles reloads
			autorestart: true,
			max_restarts: 10,
			min_uptime: '10s',
			restart_delay: 500,
			ignore_watch: ['node_modules', '.git', 'dist'],
			env: {
				NODE_ENV: 'development',
				PORT: 26882
			}
		},
		{
			name: 'project-efficient-cat-8i-server-emit',
			script: 'npx',
			args: 'tsc -w -p tsconfig.json --preserveWatchOutput',
			watch: false,
			autorestart: true,
			max_restarts: 10,
			min_uptime: '10s',
			restart_delay: 500,
			ignore_watch: ['node_modules', '.git', 'dist'],
			env: {
				NODE_ENV: 'development'
			}
		}
	]
}
