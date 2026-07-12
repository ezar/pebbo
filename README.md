# Pebbo

Pebbo es una primera versión vertical de una mascota virtual infantil original: el usuario crea un Pebbo, lo alimenta, juega, lo limpia y lo ayuda a descansar. La app es una SPA responsive, instalable como PWA y preparada para Web Push sin recopilar datos personales.

## Demo y capturas

Capturas pendientes para la siguiente iteración. Ejecuta `npm run dev` y abre la URL local de Vite.

## Stack

React, TypeScript estricto, Vite, Tailwind CSS, Zustand con `persist`, IndexedDB auxiliar, Framer Motion, Vitest, Testing Library, ESLint, `vite-plugin-pwa`/Workbox y funciones serverless de Vercel en `/api`.

## Arquitectura

- `src/engine`: lógica pura de juego, tiempo y notificaciones sin React.
- `src/store`: stores Zustand persistidos para mascota y ajustes.
- `src/components`: UI reutilizable, layout y avatar SVG original.
- `src/screens`: pantallas de bienvenida, creación, juego, ajustes y acerca de.
- `src/lib`: adaptadores de navegador para IndexedDB y notificaciones.
- `api/push`: validación serverless para suscribir, cancelar y probar push.

## Motor temporal

Cada mascota guarda `lastUpdatedAt`. Al abrir la app, enfocar la ventana o cada 30 segundos, se calcula el tiempo real transcurrido y se aplica una escala configurable con `VITE_PEBBO_TIME_SCALE`. El motor reduce hambre, felicidad, higiene y energía, recupera energía si duerme y mantiene todos los valores entre 0 y 100.

## PWA

La PWA se configura en `vite.config.ts` con manifest, iconos SVG locales, modo `standalone`, orientación `portrait`, shell offline y service worker propio en `src/sw.ts`. El componente de instalación solo aparece cuando el navegador dispara `beforeinstallprompt`.

## Notificaciones

La app detecta compatibilidad antes de mostrar acciones. El permiso se pide únicamente desde Ajustes. Si hay `VITE_VAPID_PUBLIC_KEY`, el cliente puede crear una suscripción PushManager y enviarla a `/api/push/subscribe`. En esta fase, la notificación de prueba local usa `ServiceWorkerRegistration.showNotification`. Los recordatorios programados reales requieren persistir suscripciones en almacenamiento de servidor y ejecutar un cron/worker seguro.

## Variables de entorno

Copia `.env.example` a `.env.local` si necesitas personalizar:

- `VITE_PEBBO_TIME_SCALE`: escala temporal de desarrollo.
- `VITE_VAPID_PUBLIC_KEY`: clave pública VAPID para el cliente.
- `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`: backend push; no incluir secretos en el cliente.

## Desarrollo local

```bash
npm install
npm run dev
```

## Tests y calidad

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

## Despliegue en Vercel

Vercel detecta Vite automáticamente. `vercel.json` reescribe rutas SPA a `index.html`, mantiene `/api/*` para funciones y añade cabeceras para manifest y service worker. Las previews de pull request funcionan con la integración estándar de Vercel conectada al repositorio.

## Privacidad

No hay analítica, publicidad, compras, cuentas, correo, edad, ubicación ni nombre real. El nombre de la mascota y el progreso se guardan localmente en el navegador con Zustand/localStorage; IndexedDB queda preparado para datos locales mayores. Solo si se activan recordatorios se enviaría al backend la suscripción técnica de Web Push.

## Próximos pasos

- Persistencia backend segura para suscripciones push y cron de recordatorios.
- Más etapas de crecimiento, personalidad y logros.
- Minijuegos originales y cosméticos locales.
- Capturas reales y auditoría de accesibilidad.
