import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@stylesheets/functions" as fn;`,
      },
    },
  },
  resolve: {
    alias: {
      "@stylesheets": path.resolve(__dirname, "src/stylesheets"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});
