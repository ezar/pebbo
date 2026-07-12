import { describe, expect, it } from 'vitest';import { getNotificationSupport } from './notificationEngine';
describe('notification support',()=>{it('no falla cuando notificaciones no están soportadas',()=>{expect(getNotificationSupport({navigator:{} as Navigator}).supported).toBe(false)});});
