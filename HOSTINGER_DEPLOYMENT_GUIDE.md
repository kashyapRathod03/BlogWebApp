# Hostinger Production Deployment Guide for techorcas.com

This guide provides the complete, step-by-step instructions for deploying the TechOrcas unified platform to **Hostinger** under the domain **`https://techorcas.com`**.

---

## 1. Production Environment Variables Reference

A production-ready environment configuration has been generated and saved to [`.env.production`](./.env.production).

Add these key-value pairs either in the **Hostinger hPanel Node.js Environment Variables** section or upload as a `.env` file in your application root (`public_html/`):

| Variable | Recommended Production Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations and disables debug traces |
| `PORT` | `5000` | Fallback port (Hostinger Passenger dynamically assigns one if needed) |
| `URI` | `https://techorcas.com` | Base website URI used in password reset links and email callbacks |
| `FRONTEND_URL` | `https://techorcas.com` | Allowed origin for CORS (automatically permits apex and `www.techorcas.com`) |
| `MONGO_URI` | `mongodb+srv://kashyaprathod03_db_user:onuFsoEdvy4YCEAV@cluster0.dgafzmi.mongodb.net/mern-blog?retryWrites=true&w=majority` | MongoDB Atlas cluster connection string |
| `JWT_SECRET_KEY` | `0f9a8a4ebd9df9cca86f60abdefb8f79c3fddcea975afcb327464c56e5341576` | 256-bit cryptographically secure signature secret |
| `JWT_SECRET` | `0f9a8a4ebd9df9cca86f60abdefb8f79c3fddcea975afcb327464c56e5341576` | Matching JWT validation secret |
| `JWT_EXPIRE` | `60m` | User authentication session duration |
| `RESET_PASSWORD_EXPIRE` | `3600000` | Password reset token expiration (1 hour in milliseconds) |
| `UPLOAD_DIR` | `./uploads` | Persistent directory for article & user images (or absolute Hostinger path) |
| `SMTP_HOST` | `smtp.gmail.com` *(or `smtp.titan.email`)* | Outgoing mail server for password recovery emails |
| `SMTP_PORT` | `587` *(or `465` for SSL)* | SMTP port |
| `EMAIL_USERNAME` | `partners@techorcas.com` | Mail sender username |
| `EMAIL_PASS` | `your_email_app_password` | App password (for Gmail 2FA) or Hostinger Titan password |

> [!NOTE]
> MongoDB Atlas IP Whitelist: Ensure your MongoDB Atlas Network Access allows connections from Hostinger (`0.0.0.0/0` or Hostinger server IP address) so database queries are not blocked.

---

## 2. Deployment Method A: Instant ZIP Upload (Recommended)

A pre-packaged archive **`hostinger-deploy.zip`** (3.41 MB) has been compiled and is ready in your root directory. It contains the unified backend server, the pre-compiled Vite frontend bundle (`Frontend/dist`), and the production configuration.

### Steps to Deploy via Hostinger hPanel:

1. **Log in to Hostinger hPanel**:
   - Go to [hpanel.hostinger.com](https://hpanel.hostinger.com).
   - Under **Websites**, select **Manage** for `techorcas.com`.

2. **Configure Node.js Application**:
   - In the left navigation menu, locate **Advanced** &rarr; **Node.js** (or search "Node.js" in the top bar).
   - Click **Create Application** (or Edit if already initialized):
     - **Node.js Version**: Select **20.x** (or **18.x** LTS).
     - **Application Mode**: **Production**.
     - **Application Root**: `public_html` (or `domains/techorcas.com/public_html`).
     - **Application Startup File**: `server.js`.
     - **Application URL**: `techorcas.com`.
   - Click **Save** / **Create**.

3. **Upload Deployment Bundle**:
   - Open **Files** &rarr; **File Manager** for `techorcas.com`.
   - Navigate into `public_html/`.
   - Click **Upload** &rarr; select **`hostinger-deploy.zip`**.
   - Right-click `hostinger-deploy.zip` &rarr; click **Extract** (extract directly into `public_html/`).
   - Verify that `server.js`, `package.json`, `.env`, `Backend/`, and `Frontend/dist/` are in `public_html/`.

4. **Install Dependencies**:
   - Return to the **Node.js** management page in hPanel.
   - Click the **"Install NPM Dependencies"** button. Hostinger will install all packages listed in root `package.json`.

5. **Start / Restart Application**:
   - Click **Restart** (or **Start**) in the Node.js application control panel.
   - Visit `https://techorcas.com` in your browser.

---

## 3. Deployment Method B: Hostinger Git Auto-Deployment

The repository on GitHub (`origin/main`) has been updated:

1. In hPanel &rarr; **Advanced** &rarr; **Git**.
2. Set:
   - **Repository**: `https://github.com/kashyapRathod03/BlogWebApp.git`
   - **Branch**: `main`
   - **Install path**: `public_html`
3. Click **Deploy**.
4. Open **SSH Access** in hPanel (or Web Terminal) and run:
   ```bash
   cd public_html
   cp .env.production .env
   npm install
   npm run build
   ```
5. Restart the Node.js app from the hPanel interface.

---

## 4. Verification & Health Checks

Once running, verify each endpoint:

- **Health Check API**:
  `GET https://techorcas.com/api/health` &rarr; returns `{"status":"ok"}`
- **Articles API**:
  `GET https://techorcas.com/api/articles` &rarr; returns HTTP 200 with stories
- **Frontend SPA Routing**:
  Navigate directly to `https://techorcas.com/services`, `https://techorcas.com/portfolio`, and `https://techorcas.com/blog`.
- **Sitemap & SEO**:
  Verify `https://techorcas.com/sitemap.xml` and `https://techorcas.com/robots.txt`.
