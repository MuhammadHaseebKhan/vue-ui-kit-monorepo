import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import UkButton from "../button/UkButton.vue";
import UkTextField from "../text-field/UkTextField.vue";
import UkDialog from "./UkDialog.vue";

const meta = {
  title: "Components/Dialog",
  component: UkDialog,
  args: {
    title: "Delete project",
    description: "The project and all of its data will be permanently removed.",
    closeOnBackdrop: true,
  },
  render: (args) => ({
    components: { UkDialog, UkButton },
    setup: () => ({ args, open: ref(false) }),
    template: `
      <UkButton variant="danger" @click="open = true">Delete project…</UkButton>
      <UkDialog v-bind="args" v-model:open="open">
        <p style="margin: 0">Type the project name to confirm. This cannot be undone.</p>
        <template #footer="{ close }">
          <UkButton variant="secondary" @click="close">Cancel</UkButton>
          <UkButton variant="danger" @click="close">Delete</UkButton>
        </template>
      </UkDialog>`,
  }),
} satisfies Meta<typeof UkDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmation: Story = {};

export const Form: Story = {
  args: { title: "Invite a teammate", description: undefined, closeOnBackdrop: false },
  render: (args) => ({
    components: { UkDialog, UkButton, UkTextField },
    setup: () => ({ args, open: ref(false), email: ref("") }),
    template: `
      <UkButton @click="open = true">Invite…</UkButton>
      <UkDialog v-bind="args" v-model:open="open">
        <UkTextField v-model="email" label="Email address" type="email" required />
        <template #footer="{ close }">
          <UkButton variant="ghost" @click="close">Cancel</UkButton>
          <UkButton @click="close">Send invite</UkButton>
        </template>
      </UkDialog>`,
  }),
};
