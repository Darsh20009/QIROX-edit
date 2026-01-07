# QIROX External Mode Export Package

## Instructions
1. Upload this package to your VPS.
2. Ensure you have Node.js 20+ installed.
3. Set your API Key in `.env`:
   `QIROX_API_KEY=qx_your_key_here`
   `QIROX_BASE_URL=${window.location.origin}`

## SDK Usage
```javascript
const { QiroxConnect } = require('./qirox-sdk');
const qirox = new QiroxConnect({ apiKey: process.env.QIROX_API_KEY });
```

## Deployment
`docker-compose up -d`
