import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/daralonwan/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
