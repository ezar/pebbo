/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: Array<{ url: string; revision: string | null }> };

clientsClaim();
self.skipWaiting();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(new NavigationRoute(createHandlerBoundToURL(`${import.meta.env.BASE_URL}index.html`)));

const assetUrl = (path: string) => new URL(path, self.registration.scope).toString();

self.addEventListener('push', (event) => {
  const data = event.data?.json?.() as { title?: string; body?: string; url?: string } | undefined;
  event.waitUntil(
    self.registration.showNotification(data?.title ?? 'Pebbo necesita mimo', {
      body: data?.body ?? 'Pasa un momento a saludar a tu Pebbo.',
      icon: assetUrl('icons/pwa-192.svg'),
      badge: assetUrl('icons/pwa-192.svg'),
      data: { url: data?.url ?? self.registration.scope },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data as { url?: string } | undefined)?.url ?? self.registration.scope;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const found = clients.find((client) => 'focus' in client);
      if (found) return found.focus();
      return self.clients.openWindow(url);
    }),
  );
});
