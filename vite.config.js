import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Pages": path.resolve(__dirname, "./src/pages"),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Contexts": path.resolve(__dirname, "./src/context"),
      "@States": path.resolve(__dirname, "./src/store"),
      "@Services": path.resolve(__dirname, "./src/services"),
      "@Helpers": path.resolve(__dirname, "./src/utils"),
      "@Data": path.resolve(__dirname, "./src/assets"),
    },
  },
});
