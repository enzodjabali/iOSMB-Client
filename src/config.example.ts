// Server Configuration Example
// Copy this file to config.ts and update with your actual server details

export const config = {
  // Server IP address or hostname
  ipAddress: '192.168.1.100',
  
  // Server port
  port: 8180,
  
  // Server password
  password: 'your-password-here',
  
  // Enable SSL/TLS
  ssl: false,
  
  // Web App Authentication
  // Username for web app login
  webAppUsername: 'admin',
  
  // Password hash (SHA-256) for web app login
  // To generate a hash for your password, run in your browser console:
  // crypto.subtle.digest('SHA-256', new TextEncoder().encode('your-password')).then(h => console.log(Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('')))
  // Or use: echo -n "your-password" | sha256sum (on Linux/Mac)
  // Default password: "admin123"
  webAppPasswordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
}

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
