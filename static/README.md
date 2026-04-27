# Nexdiv — single-file static site

Everything is in `index.html`: HTML + CSS + JS + Firebase (loaded from CDN).
No build step. No framework. Drop `index.html` on any host and it works.

## How to deploy on cPanel / shared hosting

1. Download `index.html`.
2. Open cPanel → **File Manager** → `public_html/` (your domain root).
3. Upload `index.html`.
4. Visit `https://yourdomain.com/` — done.

If you want it under a subfolder (e.g. `https://yourdomain.com/site/`), upload it inside that folder. The app uses hash-based routing (`#/services`, `#/admin`, etc.) so subfolders work without server config.

## Routes

- Public: `#/`, `#/services`, `#/tools`, `#/packages`, `#/about`, `#/team`, `#/contact`, `#/payment`
- Admin: `#/admin/login`, `#/admin`, `#/admin/services`, `#/admin/packages`, `#/admin/tools`, `#/admin/team`, `#/admin/orders`, `#/admin/messages`, `#/admin/settings`

## Firebase setup (one-time, ~5 min)

The Firebase config is hard-coded inside `index.html` (project: `thegrils-79663`). If you swap to a new Firebase project, edit the `FIREBASE_CONFIG` block near the top of the `<script>` section.

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
       "orders":    { ".read": "auth != null", ".write": true },
       "messages":  { ".read": "auth != null", ".write": true }
     }
   }
   ```

## First admin login

1. Go to `#/admin/login` and sign in.
2. On the dashboard, click **"Seed defaults"** once to populate the database with the bundled defaults (services / packages / tools / team / settings).
3. Edit anything from the relevant admin pages — changes go live on the public site instantly.

## Customisation

- **Colors / theme**: change in `#/admin/settings` (or edit `:root` CSS variables in the `<style>` block).
- **Hero video**: change URL in `#/admin/settings` → Hero.
- **Notice bar**: enable/disable + edit message in `#/admin/settings` → Notice.
- **Contact / payment numbers / socials**: all editable in `#/admin/settings`.
