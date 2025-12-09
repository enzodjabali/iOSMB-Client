# WebMessage - Web Client

A web-based client for communicating with the WebMessage tweak on iOS. Send and receive messages from the comfort of your web browser.

This is a web-only version of the WebMessage client, removing all Electron dependencies and running entirely in the browser.

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

- A device with the [WebMessage tweak](https://github.com/sgtaziz/WebMessage-Tweak) installed
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

## Configuration

On first launch, go to Settings and configure:

1. **Password**: The password set in the WebMessage tweak
2. **IP Address**: Your device's IP address on the local network
3. **Port**: The port configured in the WebMessage tweak (default: 8180)
4. **SSL**: Enable if you've configured SSL in the tweak

## Differences from Electron Version

This web version has the following differences:

- No USB tunneling support (direct IP connection only)
- No desktop notifications (uses browser notifications instead)
- No system tray integration
- No auto-launch on startup
- No window controls (uses browser window)
- Settings are stored in browser localStorage instead of electron-store

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with WebSocket and Notification API support

## Deployment Options

You can deploy this web app to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting service
- Your own web server (Apache, Nginx, etc.)

For HTTPS deployment, you'll need to ensure your WebMessage server also uses SSL, or configure CORS appropriately.

## Security Note

When accessing over the internet, always use SSL/HTTPS to protect your messages and credentials. Consider using a VPN for secure remote access.

## License

Same as the original WebMessage project.

## Credits

Original WebMessage client by [sgtaziz](https://github.com/sgtaziz)

Web adaptation removes Electron layer for browser-based usage.
