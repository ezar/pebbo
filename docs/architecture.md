# Arquitectura

Pebbo usa una SPA Vite/React. La regla principal es separar dominio y navegador: `src/engine` contiene funciones puras para evolución temporal, acciones y estado emocional; `src/store` adapta esa lógica a Zustand y persistencia; `src/screens` y `src/components` solo orquestan interacción y render.

La PWA usa `vite-plugin-pwa` con estrategia `injectManifest`, lo que permite un service worker propio para cache offline y eventos Push. Las APIs en `/api/push` validan payloads y dejan documentado el punto de integración con almacenamiento persistente futuro.
