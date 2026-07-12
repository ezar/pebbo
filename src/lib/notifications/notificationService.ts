import { getNotificationSupport } from '../../engine/notificationEngine';

export interface NotificationService {
  isSupported(): boolean;
  getPermission(): NotificationPermission;
  requestPermission(): Promise<NotificationPermission>;
  subscribe(): Promise<PushSubscription | null>;
  unsubscribe(): Promise<void>;
  sendTestNotification(): Promise<void>;
}

const urlBase64ToUint8Array = (base64: string) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
};

const apiUrl = (path: string) => `${import.meta.env.VITE_PUSH_API_BASE_URL ?? ''}${path}`;
const staticHosting = import.meta.env.VITE_STATIC_HOSTING === 'true';
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const browserNotificationService: NotificationService = {
  isSupported: () => getNotificationSupport().supported,
  getPermission: () => (typeof Notification === 'undefined' ? 'denied' : Notification.permission),
  async requestPermission() {
    if (!this.isSupported()) return 'denied';
    return Notification.requestPermission();
  },
  async subscribe() {
    if (!this.isSupported() || Notification.permission !== 'granted') return null;
    if (staticHosting) return null;

    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();
    if (existing) return existing;

    const key = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
    if (!key) return null;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    });

    await fetch(apiUrl('/api/push/subscribe'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription }),
    });

    return subscription;
  },
  async unsubscribe() {
    if (!('serviceWorker' in navigator) || staticHosting) return;
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await fetch(apiUrl('/api/push/unsubscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      await subscription.unsubscribe();
    }
  },
  async sendTestNotification() {
    if (!this.isSupported() || Notification.permission !== 'granted') return;
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification('Pebbo te saluda', {
      body: 'Tu Pebbo está listo para recibir mimos.',
      icon: assetUrl('icons/pwa-192.svg'),
      badge: assetUrl('icons/pwa-192.svg'),
      data: { url: import.meta.env.BASE_URL },
    });
  },
};
