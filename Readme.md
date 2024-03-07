pm2 flush
pm2 start "npm run dev" --name "frontend"
pm2 start index.js --name "backend"
pm2 logs

systemctl stop nginx
systemctl start apache2

3. *Compartir enlaces no muestra la plataforma en WhatsApp y sugerencia de mejora al compartir encuentros en el muro*: Al compartir el enlace en WhatsApp, solo se muestra el nombre del odontólogo y no la plataforma en la que se está trabajando. Además, al compartir un encuentro en el muro, se propone incluir un mensaje adicional que invite a explorar más, redirigiendo al usuario a la sección de "Descubrir" donde puede registrarse para obtener más información sobre el evento.

6. *Establecimiento de límite de almacenamiento para vídeos y corrección de visualización del reproductor de vídeo*: Se requiere establecer un límite máximo de almacenamiento para vídeos que los usuarios puedan subir. Además, se observa un problema de visualización en el reproductor de vídeo, donde solo se muestra una parte del vídeo. Se recomienda revisar este problema y ajustar la configuración del reproductor para una reproducción adecuada de los vídeos.
