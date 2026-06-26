import { createHash, randomBytes } from 'crypto'

export function generateApiKey(): { raw: string; hash: string; prefix: string } {
  const random = randomBytes(24).toString('hex')
  const raw = `gim_live_${random}`
  const hash = createHash('sha256').update(raw).digest('hex')
  const prefix = raw.slice(0, 8)
  return { raw, hash, prefix }
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex')
}
