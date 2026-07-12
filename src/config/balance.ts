import type { PetStatus } from '../types/pet';
export const STATUS_MAX=100;export const STATUS_MIN=0;
export const INITIAL_STATUS:PetStatus={hunger:82,happiness:76,hygiene:80,energy:74,health:88};
export const GAME_BALANCE={developmentTimeScale:Number(import.meta.env.VITE_PEBBO_TIME_SCALE ?? 12),decayPerGameHour:{hunger:6,happiness:4,hygiene:5,energy:4,health:0.8},sleepRecoveryPerGameHour:{energy:14,health:1.2},awakeEnergyDecayPerGameHour:5,lowNeedThreshold:35,criticalNeedThreshold:18};
