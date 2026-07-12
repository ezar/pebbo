# Despliegue en GitHub Pages

Pebbo puede publicarse temporalmente en GitHub Pages como aplicación estática. Esta opción permite probar la SPA, la experiencia principal, la persistencia local y la PWA, pero no ejecuta las funciones serverless de `/api/push`.

## Qué funciona

- Aplicación React/Vite compilada en `dist`.
- Rutas internas de la SPA porque la app actual no depende de URLs profundas del navegador.
- Manifest PWA con rutas relativas al `base` de Vite.
- Service worker, precache y notificación local de prueba cuando el navegador lo permita.
- Persistencia local con Zustand en el navegador.

## Qué queda limitado

GitHub Pages es hosting estático. Por eso no ejecuta:

- `api/push/subscribe.ts`.
- `api/push/unsubscribe.ts`.
- `api/push/test.ts`.

En el workflow de Pages se define `VITE_STATIC_HOSTING=true` para evitar llamadas a esas APIs durante el despliegue estático. Las notificaciones push reales con suscripción persistente se retomarán al migrar a Vercel u otro backend.

## Configuración

El workflow `.github/workflows/deploy-pages.yml` construye la app con:

```bash
GITHUB_PAGES=true VITE_STATIC_HOSTING=true npm run build
```

`GITHUB_PAGES=true` hace que `vite.config.ts` calcule el `base` como `/<nombre-del-repositorio>/`, por ejemplo `/pebbo/`. Para un repositorio de usuario del tipo `usuario.github.io`, usa un dominio raíz y ajusta `base` a `/` si fuera necesario.

## Activación en GitHub

1. Sube la rama a GitHub.
2. Entra en `Settings > Pages`.
3. Selecciona `Build and deployment > Source > GitHub Actions`.
4. Ejecuta el workflow manualmente o haz push a `main`/`work`.
5. La URL aparecerá en el resumen del job `deploy`.
