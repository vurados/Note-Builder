/// <reference types="vitest" />
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "../server/build",
    emptyOutDir: true,
  },
  test:{
    clearMocks: true,
    environment: 'jsdom',
    globals: true,

  },
  server: {
    port: 3000,
  // proxy:{
  //   '/NoteBuilder/api': 'http://localhost:3001/'
  // },
  },
  plugins: [
    reactRefresh(),
  ],
});