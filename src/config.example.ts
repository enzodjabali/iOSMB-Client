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
}

// Computed base URI for WebSocket connection
export const getBaseURI = (): string => {
  const protocol = config.ssl ? 'wss' : 'ws'
  return `${protocol}://${config.ipAddress}:${config.port}`
}
