import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const pagesRoot = resolve(import.meta.dirname, "github-pages-src");

export default defineConfig({
  base: "/fallowdiagnostic/",
  root: pagesRoot,
  publicDir: resolve(import.meta.dirname, "public"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, "gh-pages"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(pagesRoot, "index.html"),
        privacy: resolve(pagesRoot, "privacy/index.html"),
        disclaimer: resolve(pagesRoot, "disclaimer/index.html"),
      },
    },
  },
});
