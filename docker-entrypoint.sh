#!/bin/sh
# Replace environment variable placeholders in config.js at runtime

# Default values if not set
IOSMB_SERVER_IP="${IOSMB_SERVER_IP:-192.168.1.100}"
IOSMB_SERVER_PORT="${IOSMB_SERVER_PORT:-8180}"
IOSMB_SERVER_PASSWORD="${IOSMB_SERVER_PASSWORD:-your-password-here}"
IOSMB_SERVER_SSL="${IOSMB_SERVER_SSL:-false}"
IOSMB_WEB_USERNAME="${IOSMB_WEB_USERNAME:-admin}"
IOSMB_WEB_PASSWORD_HASH="${IOSMB_WEB_PASSWORD_HASH:-240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9}"

# Copy template to config.js
cp /usr/share/nginx/html/config.template.js /usr/share/nginx/html/config.js

# Replace placeholders with actual environment variables
sed -i "s|\${IOSMB_SERVER_IP}|${IOSMB_SERVER_IP}|g" /usr/share/nginx/html/config.js
sed -i "s|\${IOSMB_SERVER_PORT}|${IOSMB_SERVER_PORT}|g" /usr/share/nginx/html/config.js
sed -i "s|\${IOSMB_SERVER_PASSWORD}|${IOSMB_SERVER_PASSWORD}|g" /usr/share/nginx/html/config.js
sed -i "s|\${IOSMB_SERVER_SSL}|${IOSMB_SERVER_SSL}|g" /usr/share/nginx/html/config.js
sed -i "s|\${IOSMB_WEB_USERNAME}|${IOSMB_WEB_USERNAME}|g" /usr/share/nginx/html/config.js
sed -i "s|\${IOSMB_WEB_PASSWORD_HASH}|${IOSMB_WEB_PASSWORD_HASH}|g" /usr/share/nginx/html/config.js

echo "iOSMB configuration initialized with:"
echo "  Server: ${IOSMB_SERVER_IP}:${IOSMB_SERVER_PORT}"
echo "  SSL: ${IOSMB_SERVER_SSL}"
echo "  Web Username: ${IOSMB_WEB_USERNAME}"

# Start nginx
exec nginx -g 'daemon off;'
