# Nexdiv — static HTML version (cPanel-ready)

Three files, no build step, no framework. Works on any shared host.

| File | Purpose |
|---|---|
| `index.html` | Combined: public site **and** admin panel in one file. (Optional, kept for backwards compatibility.) |
| `user.html` | **Public site only** — home / services / tools / packages / about / team / contact / payment. No admin code. |
| `admin.html` | **Admin panel only** — Firebase Auth + dashboard + CRUD for everything. No public pages. |

Both `user.html` and `admin.html` talk to the **same Firebase database**, so anything you change in the admin panel goes live on the user site instantly.

## How to deploy on cPanel / shared hosting

You can use either one file or split files.

### Option A — split files (recommended)

1. Open cPanel → **File Manager** → `public_html/`.
2. Upload **`user.html`** as the public landing page (rename it to `index.html` if you want it served at the domain root).
3. Upload **`admin.html`** alongside it (so it lives at `https://yourdomain.com/admin.html`).
4. Visit `https://yourdomain.com/` for the public site, `https://yourdomain.com/admin.html` for the admin panel.

You can also put `admin.html` in a private subfolder (e.g. `public_html/secret-admin/admin.html`) so the URL is harder to guess. Firebase Auth still protects it — login is required.

### Option B — single combined file

Just upload `index.html`. Public site lives at `/`, admin lives at `/#/admin/login`.

## Routes

**user.html** (or `index.html` public side):
`#/`, `#/services`, `#/tools`, `#/packages`, `#/about`, `#/team`, `#/contact`, `#/payment`

**admin.html** (or `index.html` admin side):
`#/admin`, `#/admin/services`, `#/admin/packages`, `#/admin/tools`, `#/admin/team`, `#/admin/orders`, `#/admin/messages`, `#/admin/settings`
(In the dedicated `admin.html` you can also drop the `/admin` prefix — `#/services`, `#/packages`, etc. all work.)

## Firebase setup (one-time, ~5 min)

The Firebase config is hard-coded inside each HTML file (project: `thegrils-79663`). If you swap to a new Firebase project, edit the `FIREBASE_CONFIG` block near the top of the `<script>` section in **all three files**.

1. **Authentication → Sign-in method**: enable **Email/Password**.
2. **Authentication → Users**: add your admin email + password.
3. **Realtime Database → Rules**: paste this and **Publish**.
   ```json
   {
     "rules": {
       "settings":  { ".read": true, ".write": "auth != null" },
       "services":  { ".read": true, ".write": "auth != null" },
       "packages":  { ".read": true, ".write": "auth != null" },
       "tools":     { ".read": true, ".write": "auth != null" },
       "team":      { ".read": true, ".write": "auth != null" },
       "orders":    { ".read": "auth != null", "$orderId": { ".write": "auth != null || !data.exists()" } },
       "messages":  { ".read": "auth != null", "$msgId":  { ".write": "auth != null || !data.exists()" } }
     }
   }
   ```

## First admin login

1. Open `admin.html` (or `#/admin/login` in the combined file) and sign in.
2. On the dashboard, click **"Seed defaults"** once to populate the database with the bundled defaults (services / packages / tools / team / settings).
3. Edit anything from the relevant admin pages — changes go live on the public site instantly.

## Customisation

- **Colors / theme**: change in admin → Settings (or edit `:root` CSS variables in the `<style>` block).
- **Hero video**: admin → Settings → Hero.
- **Notice bar**: admin → Settings → Notice.
- **Contact / payment numbers / socials**: admin → Settings.
