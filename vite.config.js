import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.vue', '.js'],
    },
    define: {
      setting: {
        oauth: {
          google: {
            apiKey: env.VITE_API_KEY,
            clientId: env.VITE_CLIENT_ID,
          },
        },

        storage: {
          default: env.VITE_STORAGE ?? 'local',

          php: {
            host: env.VITE_PHP_HOST,
          },

          drive: {
            filename: env.VITE_DRIVE_FILENAME ?? 'passwords-dev.json',
          },
        },
      },
    },
  }
})
