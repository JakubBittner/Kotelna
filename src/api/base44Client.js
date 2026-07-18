import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: "6a5a7be5f309f4cf5ee1e6c0",
  // Pokud API klíč máš, přidej ho sem
  headers: {
    "api_key": "3758054dff614455852cdad91138ead0"
  },
  serverUrl: "https://app.base44.com",
  requiresAuth: true
});