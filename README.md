# Shri Pundrik Goswami Ji Maharaj &bull; Official Web Portal
### Designed & Developed &bull; Powered by Planet C

A modern, high-performance, and spiritually elevated web portal inspired by **[sripundrik.com](https://sripundrik.com/)** for **Shri Manmadhava Gaudeshwar Vaishnava Acharya Shri Pundrik Goswami Ji Maharaj** (38th Acharya of Gaudiya Parampara, Shri Radha Raman Temple, Vrindavan Dham).

---

## 🌟 Key Highlights & Modern Enhancements

Unlike standard templates or outdated 2016 themes, this portal has been crafted with a **modern, luxurious spiritual UI**:
- **Zero "Direct Copy" Look**: Custom layout featuring modern glassmorphism, refined gold accents, sacred geometry separators, soft card elevations, and clean typography (*Cinzel* + *Plus Jakarta Sans* + *Yatra One*).
- **Interactive Theme Switcher (Floating Side Widget)**:
  - Users can switch between 4 curated divine themes with 1 click:
    1. **Divine Gold & Amber** (Royal Sandalwood & Saffron)
    2. **Vrindavan Peacock & Emerald** (Mor Pankh Teal & Cyan)
    3. **Royal Crimson & Lotus Rose** (Vedic Sindoor & Gold)
    4. **Midnight Temple** (Mystic Vraj Night / Deep Dark Mode)
  - Quick **Dark Mode / Light Mode** toggle switch.
  - Text size accessibility adjuster (A- / A / A+).
  - All user preferences persist across visits via `localStorage`.
- **Prominent Footer Branding**:
  - Distinctive and glowing brand mark: **`✦ Powered by Planet C ✦`** in the bottom footer.
- **Full Interactive Functionality**:
  - **Dynamic Hero Slider**: Multi-slide spiritual carousel with autoplay, manual controls, and progress indicators.
  - **Live Katha Ticker & Countdown**: Real-time countdown timer to upcoming Mumbai & Vrindavan kathas.
  - **Online Seating Pass (RSVP Modal)**: Instant digital pass generation (`SPG-XXXXXX`) for devotees.
  - **Embedded Video Showcase**: Direct modal player for YouTube satsangs & TEDx talks without leaving the portal.
  - **Interactive Lightbox Photo Gallery**: Category filters (Katha, Darshan, Youth) + interactive like counters with live hearts.
  - **Comprehensive Seva / Donation Calculator**: Preset amounts, custom input, instant UPI QR code scan, and copy-able bank details for 80G tax-exempt donations.
  - **Inquiry & Newsletter Forms**: Validated forms with instant feedback and toast alerts.

---

## 🚀 Local Development

### Option 1: Direct Browser
Open `index.html` directly in any web browser. All styles, fonts, and scripts will load immediately.

### Option 2: Node.js Express Server
```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start
```
Visit: **`http://localhost:3000`**

---

## 🌐 Deploy to Render

### Method A: Deploy via GitHub (Recommended)

1. **Create a new GitHub repository** under `mmanishthakur2015`:
   - Repository Name: `sripundrik-web` (or `sripundrik-planet-c`)

2. **Initialize Git and Push**:
   ```bash
   cd C:\Plum_pos_Manager\hw_foundation\sripundrik_planet_c
   git init
   git add .
   git commit -m "Initial commit: Shri Pundrik Goswami Ji Portal (Powered by Planet C)"
   git branch -M main
   git remote add origin https://github.com/mmanishthakur2015/sripundrik-web.git
   git push -u origin main
   ```

3. **Deploy on Render**:
   - Go to [dashboard.render.com](https://dashboard.render.com/)
   - Click **New +** &rarr; **Web Service** (or **Static Site**)
   - Connect your GitHub repository `mmanishthakur2015/sripundrik-web`
   - Settings:
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: `Free`
   - Click **Create Web Service**! Render will deploy your site in ~1 minute.

*(Note: If deploying as a Render Static Site, set Publish Directory to `./` and Build Command to empty.)*

---

## 📁 Project Architecture

```
sripundrik_planet_c/
├── index.html          # Semantic, fully accessible HTML5 portal
├── style.css           # Modern CSS3 with CSS variables & responsive design
├── script.js           # Theme engine, slider, modals, countdown & API handlers
├── server.js           # Lightweight Node Express server & API endpoints
├── render.yaml         # Render Blueprint auto-deploy specification
├── package.json        # Dependencies & start scripts
├── .gitignore          # Ignores node_modules
└── assets/
    └── images/         # 25+ high-res portraits, banners, icons, & gallery assets
```

---

&copy; 2026 Shri Pundrik Goswami Ji Maharaj. All Rights Reserved.  
**Powered by Planet C**
