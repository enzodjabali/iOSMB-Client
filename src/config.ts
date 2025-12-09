// Runtime Configuration
// Loads from window.APP_CONFIG which is set by /public/config.js

declare global {
  interface Window {
    APP_CONFIG?: {
      ipAddress: string
      port: number
      password: string
      ssl: boolean
      webAppUsername: string
      webAppPasswordHash: string
    }
  }
}

// Default config (fallback)
const defaultConfig = {
  ipAddress: '192.168.1.100',
  port: 8180,
  password: 'your-password-here',
  ssl: false,
  webAppUsername: 'admin',
  webAppPasswordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // admin123
}

export const config = window.APP_CONFIG || defaultConfig
