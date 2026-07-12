import { create } from 'zustand';import { persist } from 'zustand/middleware';
type SettingsState={remindersEnabled:boolean;reducedMotion:boolean;setRemindersEnabled:(v:boolean)=>void;setReducedMotion:(v:boolean)=>void};
export const useSettingsStore=create<SettingsState>()(persist((set)=>({remindersEnabled:false,reducedMotion:false,setRemindersEnabled:(remindersEnabled)=>set({remindersEnabled}),setReducedMotion:(reducedMotion)=>set({reducedMotion})}),{name:'pebbo-settings-v1'}));
