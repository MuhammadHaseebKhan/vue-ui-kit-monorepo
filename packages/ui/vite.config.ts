import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: "./tsconfig.json", include: ["src"], exclude: ["src/**/*.test.ts", "src/**/*.stories.ts"] }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
      cssFileName: "style",
    },
    rollupOptions: {
      // Consumers bring their own Vue; bundling it would ship two copies.
      external: ["vue"],
    },
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
