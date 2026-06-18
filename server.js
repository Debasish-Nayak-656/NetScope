const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rate limiter: max 30 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many requests. Please wait a minute." },
});
app.use("/api/", limiter);

// ── Helper ──────────────────────────────────────────────────────────────────
function isValidIP(ip) {
  const ipv4 =
    /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  const ipv6 = /^[0-9a-fA-F:]+$/;
  return ipv4.test(ip) || ipv6.test(ip);
}

// ── Routes ──────────────────────────────────────────────────────────────────

// Get caller's own IP
app.get("/api/myip", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  res.json({ ip });
});

// Lookup a specific IP
app.get("/api/lookup/:ip", async (req, res) => {
  const { ip } = req.params;

  if (!isValidIP(ip)) {
    return res.status(400).json({ error: "Invalid IP address format." });
  }

  try {
    // Primary: ip-api.com (free, no key needed)
    const response = await axios.get(
      `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query`,
      { timeout: 5000 }
    );

    const d = response.data;

    if (d.status === "fail") {
      return res.status(404).json({ error: d.message || "IP lookup failed." });
    }

    // Shape the response nicely
    const result = {
      ip: d.query,
      location: {
        continent: d.continent,
        continentCode: d.continentCode,
        country: d.country,
        countryCode: d.countryCode,
        region: d.regionName,
        regionCode: d.region,
        city: d.city,
        district: d.district || null,
        zip: d.zip || null,
        latitude: d.lat,
        longitude: d.lon,
        timezone: d.timezone,
      },
      network: {
        isp: d.isp,
        organization: d.org,
        as: d.as,
        asName: d.asname,
        hostname: d.reverse || null,
      },
      flags: {
        mobile: d.mobile,
        proxy: d.proxy,
        hosting: d.hosting,
      },
    };

    res.json(result);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ error: "IP API timed out. Try again." });
    }
    console.error("Lookup error:", err.message);
    res.status(500).json({ error: "Server error during lookup." });
  }
});

// Lookup history (in-memory, resets on restart — swap for DB later)
const history = [];

app.post("/api/history", (req, res) => {
  const { ip, result } = req.body;
  if (!ip) return res.status(400).json({ error: "No IP provided." });

  // Avoid duplicates at front
  const exists = history.findIndex((h) => h.ip === ip);
  if (exists !== -1) history.splice(exists, 1);

  history.unshift({ ip, result, timestamp: new Date().toISOString() });
  if (history.length > 20) history.pop(); // Keep last 20
  res.json({ ok: true });
});

app.get("/api/history", (req, res) => {
  res.json(history);
});

app.delete("/api/history", (req, res) => {
  history.length = 0;
  res.json({ ok: true });
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌐 IP Lookup Tool running at http://localhost:${PORT}\n`);
});
