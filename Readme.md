pm2 flush
pm2 start "npm run dev" --name "frontend"
pm2 start index.js --name "backend"
pm2 logs

systemctl stop nginx
systemctl start apache2

2. *Objetivo no visible en tarjeta y ausente en la sección "Por Descubrir"*: Actualmente, el objetivo no se muestra en la tarjeta correspondiente y tampoco está disponible cuando se navega por la sección "Por Descubrir". Se sugiere incluir esta información tanto en la tarjeta como en la sección mencionada para una mejor comprensión y visibilidad del objetivo de la actividad.

3. *Compartir enlaces no muestra la plataforma en WhatsApp y sugerencia de mejora al compartir encuentros en el muro*: Al compartir el enlace en WhatsApp, solo se muestra el nombre del odontólogo y no la plataforma en la que se está trabajando. Además, al compartir un encuentro en el muro, se propone incluir un mensaje adicional que invite a explorar más, redirigiendo al usuario a la sección de "Descubrir" donde puede registrarse para obtener más información sobre el evento.

4. *Redirección incorrecta al crear encuentros o comunidades de pago*: Al crear encuentros o comunidades de pago, el usuario no es dirigido correctamente a la pasarela de pago, sino que se accede directamente al enlace o a la comunidad como si fuera gratuita. Se requiere corregir esta redirección para garantizar un proceso fluido y coherente de pago.

5. *Número predeterminado incorrecto al crear una comunidad*: Al crear una comunidad, el sistema establece incorrectamente un número predeterminado de 25 personas. Este valor no es adecuado y el contador asociado está mal configurado. Se necesita corregir este error para establecer un valor apropiado o permitir al usuario definir el número de miembros de la comunidad.

6. *Establecimiento de límite de almacenamiento para vídeos y corrección de visualización del reproductor de vídeo*: Se requiere establecer un límite máximo de almacenamiento para vídeos que los usuarios puedan subir. Además, se observa un problema de visualización en el reproductor de vídeo, donde solo se muestra una parte del vídeo. Se recomienda revisar este problema y ajustar la configuración del reproductor para una reproducción adecuada de los vídeos.

7. Límites palabras claves el profesional solo pueda escoger máximo 15 palabras claves que el sistema le presenta y que el líder ha creado.