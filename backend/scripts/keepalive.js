#!/usr/bin/env node
/**
 * keepalive.js
 *
 * Simple Node script to periodically ping a list of URLs to keep free/auto-sleep
 * hosting (e.g., Render) from idling. Meant to be run on a small always-on host
 * (VPS, cheap droplet, CI runner, or a scheduled GitHub Action).
 *
 * Usage:
 *   node backend/scripts/keepalive.js
 *
 * Environment variables:
 *   PING_URLS - optional JSON array of URLs to ping, e.g. '["https://a","https://b"]'
 *   PING_INTERVAL_MINUTES - optional interval in minutes (default: 10)
 *
 */

const http = require('http')
const https = require('https')

const DEFAULT_URLS = [
  'https://smartcoms.onrender.com',
  'https://phone-mart-frontend.vercel.app',
  'https://phone-mart-1.onrender.com',
  'https://www.smartcommunicationsltd.ng',
  'https://smartcommunicationsltd.ng'
]

let urls
try {
  urls = process.env.PING_URLS ? JSON.parse(process.env.PING_URLS) : DEFAULT_URLS
  if (!Array.isArray(urls) || urls.length === 0) throw new Error('PING_URLS is not a JSON array')
} catch (err) {
  console.warn('Invalid or missing PING_URLS env, falling back to default list')
  urls = DEFAULT_URLS
}

const intervalMinutes = parseInt(process.env.PING_INTERVAL_MINUTES || '10', 10)
const INTERVAL_MS = Math.max(1, intervalMinutes) * 60 * 1000
const REQUEST_TIMEOUT_MS = 15 * 1000 // 15s

function pingUrl(url) {
  return new Promise((resolve) => {
    try {
      const lib = url.startsWith('https') ? https : http
      const req = lib.get(url, { headers: { 'User-Agent': 'keepalive-pinger/1.0' } }, (res) => {
        // consume response to free sockets
        res.on('data', () => {})
        res.on('end', () => {
          resolve({ url, ok: true, statusCode: res.statusCode })
        })
      })

      req.setTimeout(REQUEST_TIMEOUT_MS, () => {
        req.abort()
        resolve({ url, ok: false, error: 'timeout' })
      })

      req.on('error', (err) => {
        resolve({ url, ok: false, error: err.message })
      })
    } catch (err) {
      resolve({ url, ok: false, error: err.message })
    }
  })
}

async function runOnce() {
  const start = new Date().toISOString()
  console.log(`[keepalive] run start ${start} - pinging ${urls.length} urls`) 

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    try {
      const result = await pingUrl(url)
      if (result.ok) {
        console.log(`[keepalive] ${url} -> ${result.statusCode}`)
      } else {
        console.warn(`[keepalive] ${url} -> error: ${result.error}`)
      }
    } catch (err) {
      console.error(`[keepalive] unexpected error pinging ${url}:`, err && err.message ? err.message : err)
    }

    // small delay between requests to avoid bursts
    await new Promise((r) => setTimeout(r, 1000))
  }

  const done = new Date().toISOString()
  console.log(`[keepalive] run finished ${done}`)
}

async function main() {
  console.log('[keepalive] starting; intervalMinutes=', intervalMinutes)
  // run immediately once
  await runOnce()

  // schedule next runs
  setInterval(() => {
    runOnce().catch((err) => console.error('[keepalive] run failed:', err))
  }, INTERVAL_MS)
}

main().catch((err) => {
  console.error('[keepalive] fatal error:', err)
  process.exit(1)
})
