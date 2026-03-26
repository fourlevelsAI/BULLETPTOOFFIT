import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bulletprooffit.app',
  appName: 'BULLETPROOFFIT',
  webDir: 'dist',
  server: {
    url: 'https://6102138b-7b36-4260-a60c-d1bb7d44f0dd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
