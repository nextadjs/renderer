import { defineConfig } from "tsup";

export default defineConfig({
  format: ['esm', 'cjs'],
  entry: ["src/index.ts"],
  target: "es2017",
  dts: true,
  clean: true,
});
