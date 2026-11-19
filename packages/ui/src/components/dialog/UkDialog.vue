<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, watch } from "vue";

/**
 * Modal dialog built on the native <dialog> element. showModal() gives us the top layer,
 * an inert background, focus containment, Escape to close and focus restoration for free,
 * which is more robust than re-implementing a focus trap.
 */
const props = withDefaults(
  defineProps<{
    /** Used as the accessible name (aria-labelledby). */
    title: string;
    description?: string;
    /** Close when the backdrop is clicked. Turn off for destructive or unsaved-work dialogs. */
    closeOnBackdrop?: boolean;
  }>(),
  { description: undefined, closeOnBackdrop: true },
);

const open = defineModel<boolean>("open", { default: false });

defineSlots<{
  default(): unknown;
  footer?(props: { close: () => void }): unknown;
}>();

const dialog = ref<HTMLDialogElement>();
const id = useId();
const titleId = `${id}-title`;
const descriptionId = `${id}-description`;

function sync(isOpen: boolean) {
  const element = dialog.value;
  if (!element) return;
  if (isOpen && !element.open) element.showModal();
  if (!isOpen && element.open) element.close();
}

function close() {
  open.value = false;
}

// Fired for Escape and for element.close(), so v-model stays in sync either way.
function onNativeClose() {
  if (open.value) open.value = false;
}

function onClick(event: MouseEvent) {
  // A click whose target is the <dialog> itself landed on the backdrop, not the panel.
  if (props.closeOnBackdrop && event.target === dialog.value) close();
}

watch(open, sync);
onMounted(() => sync(open.value));
onBeforeUnmount(() => dialog.value?.open && dialog.value.close());
</script>

<template>
  <dialog
    ref="dialog"
    class="uk-dialog"
    :aria-labelledby="titleId"
    :aria-describedby="description ? descriptionId : undefined"
    @close="onNativeClose"
    @click="onClick"
  >
    <div class="uk-dialog__panel">
      <header class="uk-dialog__header">
        <h2
          :id="titleId"
          class="uk-dialog__title"
        >
          {{ title }}
        </h2>
        <button
          type="button"
          class="uk-dialog__close"
          aria-label="Close"
          @click="close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <p
        v-if="description"
        :id="descriptionId"
        class="uk-dialog__description"
      >
        {{ description }}
      </p>
      <div class="uk-dialog__body">
        <slot />
      </div>
      <footer
        v-if="$slots.footer"
        class="uk-dialog__footer"
      >
        <slot
          name="footer"
          :close="close"
        />
      </footer>
    </div>
  </dialog>
</template>

<style>
.uk-dialog {
  padding: 0;
  border: none;
  border-radius: var(--uk-radius-lg);
  background: var(--uk-color-surface-raised);
  color: var(--uk-color-text);
  font-family: var(--uk-font-family);
  box-shadow: var(--uk-shadow-overlay);
  inline-size: min(32rem, calc(100vw - 2 * var(--uk-space-4)));
}

.uk-dialog::backdrop {
  background: var(--uk-color-backdrop);
}

.uk-dialog__panel {
  display: flex;
  flex-direction: column;
  gap: var(--uk-space-3);
  padding: var(--uk-space-6);
}

.uk-dialog__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--uk-space-4);
}

.uk-dialog__title {
  margin: 0;
  font-size: var(--uk-font-size-lg);
  font-weight: var(--uk-font-weight-bold);
}

.uk-dialog__close {
  inline-size: 2rem;
  block-size: 2rem;
  margin-block-start: calc(-1 * var(--uk-space-1));
  margin-inline-end: calc(-1 * var(--uk-space-2));
  border: none;
  border-radius: var(--uk-radius-sm);
  background: transparent;
  color: var(--uk-color-text-muted);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.uk-dialog__close:hover {
  background: var(--uk-color-surface-muted);
}

.uk-dialog__close:focus-visible {
  outline: none;
  box-shadow: var(--uk-focus-ring);
}

.uk-dialog__description {
  margin: 0;
  color: var(--uk-color-text-muted);
}

.uk-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--uk-space-2);
  padding-block-start: var(--uk-space-2);
}
</style>
