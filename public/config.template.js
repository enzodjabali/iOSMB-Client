// Runtime Configuration Template for iOSMB
// Placeholders will be replaced by docker-entrypoint.sh at container startup

window.APP_CONFIG = {
  // iOSMB Server IP/Hostname
  ipAddress: '${IOSMB_SERVER_IP}',
  
  // iOSMB Server Port
  port: ${IOSMB_SERVER_PORT},
  
  // iOSMB Server Password
  password: '${IOSMB_SERVER_PASSWORD}',
  
  // Enable SSL/TLS for WebSocket connection
  ssl: ${IOSMB_SERVER_SSL},
  
  // Web App Login Credentials
  webAppUsername: '${IOSMB_WEB_USERNAME}',
  
  // Web App Password Hash (SHA-256)
  // To generate: echo -n "your-password" | sha256sum
  webAppPasswordHash: '${IOSMB_WEB_PASSWORD_HASH}'
}
