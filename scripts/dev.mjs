import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const children = [
  spawn(process.execPath, ['--watch', '--env-file-if-exists=.env', 'src/server.mjs'], { cwd: `${root}/backend`, stdio: 'inherit' }),
  spawn(process.execPath, [`${root}/node_modules/vite/bin/vite.js`], { cwd: `${root}/frontend`, stdio: 'inherit' }),
]
let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  children.forEach(child => child.kill())
  process.exitCode = code
}
children.forEach(child => {
  child.on('error', error => { console.error(error); stop(1) })
  child.on('exit', code => stop(code ?? 1))
})
process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
