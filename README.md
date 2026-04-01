# The Rolodex — Personal CRM

A personal CRM built on Jordan Harbinger's 6-Minute Networking philosophy.
Tracks contacts, reminds you to reach out, and generates AI-powered opening messages.

---

## How to Get This Live (Step by Step)

### Step 1: Get it on GitHub

1. Go to **github.com** and log in (your account: `littletroubleatl`)
2. Click the **+** in the top right → **New repository**
3. Name it `the-rolodex` and click **Create repository**
4. On your computer, open Terminal and run:

```bash
cd ~/Desktop
# Unzip the project folder I gave you, then:
cd the-rolodex
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/littletroubleatl/the-rolodex.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Netlify

1. Go to **app.netlify.com** and log in
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** → select `the-rolodex`
4. Netlify will auto-detect the settings from `netlify.toml`. Just click **Deploy site**
5. Wait ~1-2 minutes for the build to finish
6. Your site is live! Netlify gives you a URL like `random-name.netlify.app`

### Step 3: Connect a Custom Domain (Optional)

Same process as Little Trouble — in Netlify go to **Domain settings** → **Add custom domain**.

### Step 4: Turn on AI Gambits (Optional but Recommended)

The AI-powered opening messages need an Anthropic API key:

1. Go to **console.anthropic.com** → sign up or log in
2. Go to **API Keys** → **Create Key** → copy it
3. In Netlify: **Site settings** → **Environment variables** → **Add a variable**
   - Key: `ANTHROPIC_API_KEY`
   - Value: paste your API key
4. Go to **Deploys** → **Trigger deploy** → **Deploy site**

Without this, the app still works great — it just uses the built-in message templates instead of AI-generated ones.

### Step 5: Add to Your Phone Home Screen

**iPhone:**
1. Open your site URL in Safari
2. Tap the Share button (square with arrow)
3. Scroll down → tap **Add to Home Screen**
4. Name it "The Rolodex" → tap **Add**

**Android:**
1. Open your site URL in Chrome
2. Tap the three dots menu
3. Tap **Add to Home screen** or **Install app**

Now it opens full-screen like a real app, with the gold R icon.

---

## What's in the Box

```
the-rolodex/
├── index.html              ← Entry page
├── package.json            ← Dependencies
├── vite.config.js          ← Build tool config
├── netlify.toml            ← Tells Netlify how to build & deploy
├── public/
│   ├── manifest.json       ← PWA config (home screen icon, colors)
│   ├── sw.js               ← Service worker (offline support)
│   ├── icon-192.png        ← App icon
│   └── icon-512.png        ← App icon (high-res)
├── src/
│   ├── main.jsx            ← React entry point
│   ├── App.jsx             ← The entire app
│   └── storage.js          ← Saves contacts in your browser
└── netlify/
    └── functions/
        └── gambit.mjs      ← Server-side AI message generator
```

## Features

- **Contact management** — name, nickname, date/location met, mutual associates, email, phone, Instagram, notes
- **Categories** — Personal, Business, "Dig the Well" (your emergency 15)
- **Tags** — VIP, Mentor, Client, etc. — create your own
- **Custom fields** — add any field you want (Company, Birthday, etc.)
- **Urgency tracking** — color-coded overdue indicators
- **Daily Digest** — prioritized outreach list
- **AI Opening Gambits** — Claude generates context-aware re-engagement messages
- **CSV Import/Export** — works with Google Contacts export
- **PWA** — installable on your phone home screen
- **Offline-capable** — works without internet (except AI gambits)
- **All data stays in your browser** — nothing sent to any server

---

## Built on

- Jordan Harbinger's 6-Minute Networking principles
- React + Vite
- Netlify Functions (for AI)
- Anthropic Claude API (for AI gambits)
