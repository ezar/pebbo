# Notificaciones

El flujo está preparado para Web Push real:

1. Detectar `Notification`, `ServiceWorker` y `PushManager`.
2. Pedir permiso solo tras acción explícita en Ajustes.
3. Registrar/usar el service worker.
4. Crear suscripción con la clave pública VAPID del cliente.
5. Enviar la suscripción a `/api/push/subscribe`.
6. Recibir `push` en `src/sw.ts` y abrir Pebbo al pulsar.

En esta fase no se guardan suscripciones en una base de datos ni se envían recordatorios programados. Para producción falta almacenamiento persistente, un job programado y envío con una librería como `web-push` usando secretos VAPID solo en servidor.
