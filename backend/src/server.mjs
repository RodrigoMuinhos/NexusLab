import { createServer } from 'node:http'
import { appendFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { randomUUID } from 'node:crypto'

const port = Number(process.env.PORT || 3001)
const host = process.env.HOST || '127.0.0.1'
const origins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5174,http://127.0.0.1:5174').split(',').map(value => value.trim())
const dataFile = resolve(process.env.DATA_DIR || 'data', 'contacts.jsonl')

const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  const reply = (status, body) => { res.writeHead(status); res.end(JSON.stringify(body)) }
  if (req.headers.origin) {
    if (!origins.includes(req.headers.origin)) return reply(403, { error: 'Origin not allowed' })
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end() }
  const pathname = new URL(req.url, 'http://localhost').pathname
  if (pathname === '/api/health' && req.method === 'GET') return reply(200, { status: 'ok', service: 'nexus-lab-backend' })
  if (pathname !== '/api/contacts') return reply(404, { error: 'Not found' })
  if (req.method !== 'POST') return reply(405, { error: 'Method not allowed' })
  if (!req.headers['content-type']?.includes('application/json')) return reply(415, { error: 'JSON required' })
  try {
    let raw = ''
    let size = 0
    for await (const chunk of req) {
      size += chunk.length
      if (size > 16384) return reply(413, { error: 'Request too large' })
      raw += chunk.toString()
    }
    let input
    try { input = JSON.parse(raw) } catch { return reply(400, { error: 'Invalid JSON' }) }
    if (!input || typeof input !== 'object' || Array.isArray(input)) return reply(400, { error: 'Invalid contact' })
    const contact = {}
    for (const [field, limit] of Object.entries({ name: 200, email: 254, company: 200, interest: 200, idea: 5000 })) {
      if (input[field] !== undefined && typeof input[field] !== 'string') return reply(400, { error: `Invalid ${field}` })
      contact[field] = (input[field] || '').trim()
      if (contact[field].length > limit) return reply(400, { error: `${field} too long` })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) return reply(400, { error: 'Invalid email' })
    const record = { id: randomUUID(), createdAt: new Date().toISOString(), ...contact }
    await mkdir(dirname(dataFile), { recursive: true })
    await appendFile(dataFile, `${JSON.stringify(record)}\n`, { encoding: 'utf8', mode: 0o600 })
    return reply(201, { id: record.id, status: 'received' })
  } catch (error) {
    console.error('Failed to save contact:', error.message)
    if (!res.headersSent) reply(500, { error: 'Unable to save contact' })
  }
})
server.listen(port, host, () => console.log(`Nexus Lab API: http://${host}:${port}`))
server.on('error', error => { console.error(error.message); process.exitCode = 1 })
