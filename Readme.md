pm2 flush
pm2 start "npm run dev" --name "frontend"
pm2 start index.js --name "backend"
pm2 logs

systemctl stop nginx
systemctl start apache2