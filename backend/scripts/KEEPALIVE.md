keepalive script

This folder contains a small Node.js script to ping your deployment URLs periodically to keep free/auto-sleep hosting (e.g., Render) awake.

Files
- keepalive.js - the ping script

Quick start (local)

1) From the repository root, run:

   node backend/scripts/keepalive.js

2) To run in background with nohup:

   nohup node backend/scripts/keepalive.js &

Using pm2 (recommended on small servers)

1) Install pm2 globally:

   npm i -g pm2

2) Start the script:

   pm2 start backend/scripts/keepalive.js --name phone-mart-keepalive --node-args="--max-old-space-size=64"

3) Make it persistent across reboots:

   pm2 save
   pm2 startup

Systemd unit (example)

Create `/etc/systemd/system/phone-mart-keepalive.service` with contents:

[Unit]
Description=Phone-mart keepalive pinger
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/home/youruser/Documents/web2/Phone-mart
ExecStart=/usr/bin/node /home/youruser/Documents/web2/Phone-mart/backend/scripts/keepalive.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

Then:

sudo systemctl daemon-reload
sudo systemctl enable --now phone-mart-keepalive

GitHub Actions scheduled runner

You can also add a GitHub Actions workflow to run this on a schedule if you prefer not to host the script yourself. Create `.github/workflows/keepalive.yml` and schedule a workflow to curl your site every 10 minutes.

Environment variables

- PING_URLS - optional JSON array of URLs to ping
- PING_INTERVAL_MINUTES - interval in minutes (default 10)

Notes

- Be mindful of the hosting provider's ToS. Some providers disallow external keep-alive probes to prevent abuse.
- The script is intentionally minimal and has a small 15s request timeout per URL.
