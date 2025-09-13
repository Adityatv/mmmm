# HLS Proxy Player

This is a simple HLS video player that can bypass CORS issues using a Node.js proxy.

## 🚀 Local Setup
1. Install Node.js
2. Clone this repo
3. Install dependencies:
   ```
   npm install
   ```
4. Start the proxy:
   ```
   npm start
   ```
   Runs on http://localhost:3000

5. Open `player.html` in your browser (served via Render, Vercel, or any static host).

## 🌐 Deploy on Render.com
1. Push this repo to GitHub
2. Go to [Render](https://render.com)
3. Create a **Web Service**
   - Runtime: Node.js
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Once deployed, open:
   ```
   https://your-app.onrender.com/player.html
   ```

## ℹ️ Notes
- If a stream requires authentication or DRM, it may still fail.
- This proxy rewrites `.m3u8` manifests so segment requests also flow through the proxy.
