# 🌐 NetScope — IP Address Lookup Tool

<div align="center">

![NetScope Banner](https://img.shields.io/badge/NetScope-IP%20Intelligence-00d4ff?style=for-the-badge&logo=internetexplorer&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![ip-api](https://img.shields.io/badge/Powered%20by-ip--api.com-00ff9d?style=flat-square)](https://ip-api.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**A full-stack IP address intelligence tool — instantly lookup geolocation, ISP, proxy/VPN detection, and more for any IP address.**

[🚀 Features](#-features) • [📦 Installation](#-installation) • [🔌 API Docs](#-api-endpoints) • [🧩 Tech Stack](#-tech-stack) • [📸 Screenshot](#-screenshot)

</div>

---

## 📸 Screenshot

> A sleek terminal/cyber-themed UI with dark mode, live map, and real-time results.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **Geolocation** | Country, region, city, ZIP code, timezone |
| 🏢 **Network Info** | ISP, organization, AS number, hostname |
| 🗺️ **Live Map** | Pinpoints approximate location via OpenStreetMap |
| 🛡️ **VPN / Proxy Detection** | Flags proxy, VPN, hosting/datacenter, mobile |
| ⊙ **Detect My IP** | One click to look up your own IP address |
| 📜 **Lookup History** | Remembers your last 20 lookups per session |
| ⚡ **Rate Limiting** | 30 requests/min per IP to prevent abuse |
| 🌐 **IPv4 + IPv6** | Supports both IP address formats |

---

## 📦 Installation

### Prerequisites
Make sure you have **Node.js** (v14 or higher) installed.
- Download it here → [nodejs.org](https://nodejs.org)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/netscope-ip-lookup.git

# 2. Go into the project folder
cd netscope-ip-lookup

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

### 5. Open in your browser
```
http://localhost:3000
```

> 💡 **For development** (auto-restarts on file changes):
> ```bash
> npm run dev
> ```

---

## 🔌 API Endpoints

You can also use the backend as a REST API directly.

### 🔍 Lookup an IP
```
GET /api/lookup/:ip
```

**Example:**
```bash
curl http://localhost:3000/api/lookup/8.8.8.8
```

**Response:**
```json
{
  "ip": "8.8.8.8",
  "location": {
    "country": "United States",
    "countryCode": "US",
    "region": "California",
    "city": "Mountain View",
    "latitude": 37.4056,
    "longitude": -122.0775,
    "timezone": "America/Los_Angeles"
  },
  "network": {
    "isp": "Google LLC",
    "organization": "Google Public DNS",
    "as": "AS15169 Google LLC",
    "hostname": "dns.google"
  },
  "flags": {
    "mobile": false,
    "proxy": false,
    "hosting": true
  }
}
```

---

### 📍 Get Your Own IP
```
GET /api/myip
```

### 📜 History
```
GET    /api/history     → Get recent lookups
POST   /api/history     → Save a lookup
DELETE /api/history     → Clear all history
```

---

## 🗂️ Project Structure

```
netscope-ip-lookup/
│
├── 📄 server.js          ← Express backend (API + serves frontend)
├── 📄 package.json       ← Project dependencies & scripts
├── 📄 README.md          ← You're reading this!
│
└── 📁 public/
    └── 📄 index.html     ← Frontend UI (HTML + CSS + JS)
```

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js + Express |
| **Frontend** | HTML, CSS, Vanilla JavaScript |
| **IP Data** | [ip-api.com](https://ip-api.com) (free, no key needed) |
| **Map** | OpenStreetMap (embedded iframe) |
| **Rate Limiting** | express-rate-limit |

---

## ⚙️ Configuration

### Change the Port
By default the app runs on port `3000`. To change it:

```bash
PORT=8080 npm start
```

Or set it in a `.env` file:
```
PORT=8080
```

### Change Rate Limit
Edit `server.js`:
```js
const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute window
  max: 30,              // ← change this number
});
```

---

## 🚀 Upgrade Ideas

Want to take this project further? Here are some ideas:

- 💾 **Database** — Store history in SQLite or MongoDB (persistent across restarts)
- 📊 **Bulk Lookup** — Paste a list of IPs and look up all at once
- 📁 **Export Results** — Download lookup data as CSV or PDF
- 🔐 **User Accounts** — Save personal lookup history with login
- 🗝️ **ipinfo.io API** — Richer data with a free API key
- 🌙 **Light/Dark Mode** — Toggle between themes
- 📱 **PWA** — Make it installable on mobile

---

## ⚠️ Legal & Ethical Notice

> This tool uses **publicly available** geolocation data.

- ❌ It **cannot** reveal someone's exact home address
- ❌ It **cannot** be used to hack, stalk, or personally track individuals
- ✅ It **is legal** when used for network diagnostics, security research, or education
- ✅ It uses [ip-api.com](https://ip-api.com) which is **free for non-commercial use**

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [ip-api.com](https://ip-api.com) — Free IP geolocation API
- [OpenStreetMap](https://openstreetmap.org) — Free map tiles
- [Express.js](https://expressjs.com) — Web framework for Node.js

---

<div align="center">
Made with ❤️ | Give it a ⭐ if you found it useful!
</div>
