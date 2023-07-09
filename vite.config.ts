import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checkerPlugin from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checkerPlugin({
      overlay: false,
      typescript: {
        tsconfigPath: "./tsconfig.json",
      },
      eslint: {
        lintCommand: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
      },
      enableBuild: false,
    }),
  ],
});
