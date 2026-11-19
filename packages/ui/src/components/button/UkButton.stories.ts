import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";
import UkButton from "./UkButton.vue";

const meta = {
  title: "Components/Button",
  component: UkButton,
  args: { variant: "primary", size: "md", disabled: false, loading: false, block: false, onClick: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => ({
    components: { UkButton },
    setup: () => ({ args }),
    template: '<UkButton v-bind="args">Save changes</UkButton>',
  }),
} satisfies Meta<typeof UkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { UkButton },
    template: `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
        <UkButton variant="primary">Primary</UkButton>
        <UkButton variant="secondary">Secondary</UkButton>
        <UkButton variant="ghost">Ghost</UkButton>
        <UkButton variant="danger">Delete</UkButton>
      </div>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { UkButton },
    template: `
      <div style="display: flex; gap: 0.75rem; align-items: center">
        <UkButton size="sm">Small</UkButton>
        <UkButton size="md">Medium</UkButton>
        <UkButton size="lg">Large</UkButton>
      </div>`,
  }),
};

export const Loading: Story = { args: { loading: true } };

export const Disabled: Story = { args: { disabled: true } };

export const WithIcons: Story = {
  render: (args) => ({
    components: { UkButton },
    setup: () => ({ args }),
    template: `
      <UkButton v-bind="args">
        <template #start><span>＋</span></template>
        Add item
        <template #end><span>→</span></template>
      </UkButton>`,
  }),
};
