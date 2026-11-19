import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import UkTextField from "./UkTextField.vue";

const meta = {
  title: "Components/TextField",
  component: UkTextField,
  args: { label: "Email address", hint: "We'll only use it for receipts.", type: "email", required: false, disabled: false },
  render: (args) => ({
    components: { UkTextField },
    setup: () => ({ args, value: ref("") }),
    template: '<div style="max-width: 22rem"><UkTextField v-bind="args" v-model="value" /></div>',
  }),
} satisfies Meta<typeof UkTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = { args: { required: true } };

export const WithError: Story = {
  args: { error: "Enter an email address like name@example.com" },
};

export const Disabled: Story = { args: { disabled: true } };

export const Arabic: Story = {
  args: { label: "البريد الإلكتروني", hint: "سنستخدمه للإيصالات فقط.", error: undefined },
  globals: { direction: "rtl" },
};
