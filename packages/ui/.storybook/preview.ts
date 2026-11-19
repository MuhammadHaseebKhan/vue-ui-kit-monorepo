import type { Preview } from "@storybook/vue3-vite";
import "@vue-ui-kit/tokens/tokens.css";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: "Text direction",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "Left to right" },
          { value: "rtl", title: "Right to left" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light", direction: "ltr" },
  decorators: [
    (story, context) => {
      const root = document.documentElement;
      root.dataset.ukTheme = context.globals.theme as string;
      root.dir = context.globals.direction as string;
      return {
        components: { story },
        template: "<story />",
      };
    },
  ],
  parameters: {
    a11y: { test: "error" },
    controls: { expanded: true },
  },
};

export default preview;
