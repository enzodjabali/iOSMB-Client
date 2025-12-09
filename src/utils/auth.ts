import { config } from '@/config'

// Computed base URI for WebSocket connection
export const getBaseURI = (): string => {
  const protocol = config.ssl ? 'wss' : 'ws'
  return `${protocol}://${config.ipAddress}:${config.port}`
}

// Hash password using SHA-256
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
