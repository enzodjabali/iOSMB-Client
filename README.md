# iOSMB Client - iOS Message Bridge

A web-based client for iOS Message Bridge. Send and receive iOS messages from the comfort of your web browser.

This is a web-only client, removing all Electron dependencies and running entirely in the browser.

## Features

- Real-time sending and receiving of messages via WebSocket
- Sending attachments from your computer
- Browser notifications
- SSL encryption support
- Password-protected connection
- Message reactions (tapbacks)
- Emoji support with multiple emoji sets
- Privacy mode
- Message caching

## Requirements

- An iOS device with iOSMB Server installed
- Node.js and npm/yarn installed for development
- Your device and computer must be on the same network (or use port forwarding/VPN)

## Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

## Development

```bash
# Run development server
npm run serve
# or
yarn serve
```

The application will be available at `http://localhost:8080`

## Building for Production

```bash
# Build for production
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory and can be deployed to any static web hosting service.

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and run the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:8080`

### Using Docker directly

```bash
# Build the image
docker build -t webmessage-web .

# Run the container
docker run -d -p 8080:80 --name webmessage webmessage-web

# View logs
docker logs -f webmessage

# Stop and remove the container
docker stop webmessage
docker rm webmessage
```

## Configuration

On first launch, go to Settings and configure:

1. **Password**: The password set in the iOSMB Server
2. **IP Address**: Your iOS device's IP address on the local network
3. **Port**: The port configured in the iOSMB Server (default: 8180)
4. **SSL**: Enable if you've configured SSL in the server

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with WebSocket and Notification API support

## HEIC Image Support

The client **automatically converts HEIC images** (iPhone format) to JPEG for display in the browser. When you receive a HEIC image:

1. The app detects the HEIC format
2. Shows a "Converting..." message briefly
3. Converts the image to JPEG in the browser
4. Displays the converted image normally

This works entirely client-side using the `heic2any` library, so no server-side configuration is needed!

## Security Note

When accessing over the internet, always use SSL/HTTPS to protect your messages and credentials. Consider using a VPN for secure remote access.

## License

MIT License

## Credits

Based on the original WebMessage project by [sgtaziz](https://github.com/sgtaziz)
