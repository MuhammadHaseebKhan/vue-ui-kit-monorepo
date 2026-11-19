<script setup lang="ts">
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Defaults to "button" so a button inside a form never submits by accident. */
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    /** Shows a spinner, sets aria-busy and blocks clicks while keeping the button focusable. */
    loading?: boolean;
    /** Stretch to the full width of the container. */
    block?: boolean;
  }>(),
  { variant: "primary", size: "md", type: "button", disabled: false, loading: false, block: false },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

defineSlots<{
  default(): unknown;
  start?(): unknown;
  end?(): unknown;
}>();

function onClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <!--
    While loading we use aria-disabled instead of the disabled attribute, so the button keeps
    focus and screen readers announce the busy state instead of the control vanishing.
  -->
  <button
    :type="type"
    :disabled="disabled"
    :aria-disabled="loading || undefined"
    :aria-busy="loading || undefined"
    :class="['uk-button', `uk-button--${variant}`, `uk-button--${size}`, { 'uk-button--block': block, 'uk-button--loading': loading }]"
    @click="onClick"
  >
    <span
      v-if="loading"
      class="uk-button__spinner"
      aria-hidden="true"
    />
    <span
      v-if="$slots.start"
      class="uk-button__icon"
      aria-hidden="true"
    ><slot name="start" /></span>
    <span class="uk-button__label"><slot /></span>
    <span
      v-if="$slots.end"
      class="uk-button__icon"
      aria-hidden="true"
    ><slot name="end" /></span>
  </button>
</template>

<style>
.uk-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--uk-space-2);
  border: 1px solid transparent;
  border-radius: var(--uk-radius-md);
  font: inherit;
  font-family: var(--uk-font-family);
  font-weight: var(--uk-font-weight-medium);
  line-height: 1.2;
  cursor: pointer;
  transition:
    background-color var(--uk-duration-fast),
    border-color var(--uk-duration-fast),
    color var(--uk-duration-fast);
}

.uk-button:focus-visible {
  outline: none;
  box-shadow: var(--uk-focus-ring);
}

.uk-button:disabled,
.uk-button[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.55;
}

.uk-button--sm {
  padding-block: var(--uk-space-1);
  padding-inline: var(--uk-space-3);
  font-size: var(--uk-font-size-sm);
}

.uk-button--md {
  padding-block: var(--uk-space-2);
  padding-inline: var(--uk-space-4);
  font-size: var(--uk-font-size-md);
}

.uk-button--lg {
  padding-block: var(--uk-space-3);
  padding-inline: var(--uk-space-6);
  font-size: var(--uk-font-size-lg);
}

.uk-button--block {
  display: flex;
  inline-size: 100%;
}

.uk-button--primary {
  background: var(--uk-color-accent);
  color: var(--uk-color-on-accent);
}

.uk-button--primary:not(:disabled, [aria-disabled="true"]):hover {
  background: var(--uk-color-accent-hover);
}

.uk-button--secondary {
  background: var(--uk-color-surface);
  border-color: var(--uk-color-border);
  color: var(--uk-color-text);
}

.uk-button--secondary:not(:disabled, [aria-disabled="true"]):hover,
.uk-button--ghost:not(:disabled, [aria-disabled="true"]):hover {
  background: var(--uk-color-surface-muted);
}

.uk-button--ghost {
  background: transparent;
  color: var(--uk-color-text);
}

.uk-button--danger {
  background: var(--uk-color-danger);
  color: var(--uk-color-on-accent);
}

.uk-button__icon {
  display: inline-flex;
}

.uk-button__spinner {
  inline-size: 1em;
  block-size: 1em;
  border: 2px solid currentColor;
  border-inline-end-color: transparent;
  border-radius: 50%;
  animation: uk-spin 0.7s linear infinite;
}

@keyframes uk-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
