const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Allow browser access (CORS fix)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Proxy endpoint: /proxy?url=<m3u8 or ts>
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing url param");
  }

  try {
    const r = await fetch(targetUrl);
    const contentType = r.headers.get("content-type");
    res.setHeader("content-type", contentType || "application/vnd.apple.mpegurl");

    // If it's a manifest, rewrite segment URLs to go through proxy
    if (contentType && contentType.includes("mpegurl")) {
      let text = await r.text();
      text = text.replace(/(https?:\/\/[^\s]+)/g, (m) => {
        return `${req.protocol}://${req.get("host")}/proxy?url=${encodeURIComponent(m)}`;
      });
      res.send(text);
    } else {
      const buf = await r.buffer();
      res.send(buf);
    }
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
