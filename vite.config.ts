import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FhirQuestionnaireRenderer',
      // the proper extensions will be added
      fileName: 'fhir-questionnaire-renderer',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'quasar'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          quasar: 'Quasar'
        }
      }
    }
  }
});
