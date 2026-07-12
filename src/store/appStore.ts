import { create } from 'zustand';
type AppState={lastAction:string|null;setLastAction:(action:string|null)=>void};export const useAppStore=create<AppState>((set)=>({lastAction:null,setLastAction:(lastAction)=>set({lastAction})}));
