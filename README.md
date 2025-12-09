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

## Configuration

Before running the application, you need to configure the server settings and authentication:

1. Copy `src/config.example.ts` to `src/config.ts`
2. Update the configuration file with your settings

### Default Settings

The default configuration in `src/config.ts` includes:

#### Web App Login (for accessing the web interface)
- **Username**: `admin`
- **Password**: `admin123`
- **Password Hash**: `240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9`

#### Server Connection (your iOS device)
- **IP Address**: `79.137.79.153` (example - change to your device IP)
- **Port**: `8180`
- **Server Password**: `W3bM4sSaGs188SecUr1z0` (example - change to your server password)
- **SSL**: `false`

### Changing the Web App Password

To set a new password for the web app login:

**Option 1 - Browser Console:**
```javascript
crypto.subtle.digest('SHA-256', new TextEncoder().encode('your-new-password'))
  .then(h => console.log(Array.from(new Uint8Array(h))
  .map(b => b.toString(16).padStart(2, '0')).join('')))
```

**Option 2 - Linux/Mac Terminal:**
```bash
echo -n "your-new-password" | sha256sum
```

Copy the generated hash and update `webAppPasswordHash` in `src/config.ts`.

**Important:** Server settings are now configured in code, not in the browser UI.

1. Copy the example configuration file:
   ```bash
   cp src/config.example.ts src/config.ts
   ```

2. Edit `src/config.ts` with your iOSMB server details:
   ```typescript
   export const config = {
     ipAddress: '192.168.1.100',  // Your iOS device IP
     port: 8180,                   // Server port
     password: 'your-password',    // Server password
     ssl: false,                   // Enable if using HTTPS
   }
   ```

3. The `config.ts` file is ignored by git to protect your credentials.

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
# Build and run the container (will show version as "dev")
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

**Note:** When running locally with `yarn serve` or `docker-compose`, the version will display as "dev". When building with a Git tag (e.g., `v1.0.0`), the actual version will be shown.

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

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with WebSocket and Notification API support

## Apple Format Support

### HEIC Images (Client-Side)

The client **automatically converts HEIC images** (iPhone format) to JPEG for display in the browser. When you receive a HEIC image:

1. The app detects the HEIC format
2. Shows a "Converting..." message briefly
3. Converts the image to JPEG in the browser
4. Displays the converted image normally

This works entirely client-side using the `heic2any` library, so no server-side configuration is needed!

### MOV Videos & CAF Audio (Server-Side)

In Settings, there's a "Convert Apple formats (mov, heic, caf)" toggle. When enabled, it adds `&transcode=1` to media URLs, which tells the **server** to convert:

- **MOV** videos → MP4/WebM
- **CAF** audio → MP3/OGG  
- **HEIC** images → JPEG (though client-side conversion is preferred)

**Important:** This requires the server to support transcoding. The client cannot convert video/audio formats in the browser. Make sure your iOSMB Server has transcoding capabilities if you need MOV/CAF support.

## Security Note

When accessing over the internet, always use SSL/HTTPS to protect your messages and credentials. Consider using a VPN for secure remote access.

## License

MIT License

## Credits

Based on the original WebMessage project by [sgtaziz](https://github.com/sgtaziz)
