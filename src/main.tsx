import React from 'react';import ReactDOM from 'react-dom/client';import { registerSW } from 'virtual:pwa-register';import { App } from './app/App';import './styles/global.css';
registerSW({immediate:true,onNeedRefresh(){console.info('Nueva versión de Pebbo disponible.');},onOfflineReady(){console.info('Pebbo listo sin conexión.');}});
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
