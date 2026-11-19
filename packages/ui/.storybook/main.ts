import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  framework: "@storybook/vue3-vite",
  stories: ["../src/**/*.stories.ts"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  viteFinal(viteConfig) {
    // The package's vite.config is set up for library builds; declaration generation
    // is irrelevant (and slow) for the Storybook bundle.
    viteConfig.plugins = (viteConfig.plugins ?? []).filter(
      (plugin) => !(plugin && typeof plugin === "object" && "name" in plugin && plugin.name === "vite:dts"),
    );
    return viteConfig;
  },
};

export default config;
