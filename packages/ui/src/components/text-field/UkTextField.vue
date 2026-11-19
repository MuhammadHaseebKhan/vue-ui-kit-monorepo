<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Visible label. Required: placeholder text is not a label. */
    label: string;
    hint?: string;
    /** When set, the field is marked invalid and the message is announced with the field. */
    error?: string;
    type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
    required?: boolean;
    disabled?: boolean;
  }>(),
  { hint: undefined, error: undefined, type: "text", required: false, disabled: false },
);

const model = defineModel<string>({ default: "" });

const id = useId();
const hintId = `${id}-hint`;
const errorId = `${id}-error`;

// Error first: screen readers read describedby targets in order.
const describedBy = computed(
  () => [props.error ? errorId : null, props.hint ? hintId : null].filter(Boolean).join(" ") || undefined,
);
</script>

<template>
  <div :class="['uk-field', { 'uk-field--invalid': !!error, 'uk-field--disabled': disabled }]">
    <label
      :for="id"
      class="uk-field__label"
    >
      {{ label }}
      <span
        v-if="required"
        class="uk-field__required"
        aria-hidden="true"
      >*</span>
    </label>
    <input
      :id="id"
      v-model="model"
      v-bind="$attrs"
      :type="type"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="describedBy"
      class="uk-field__input"
    >
    <p
      v-if="error"
      :id="errorId"
      class="uk-field__error"
    >
      {{ error }}
    </p>
    <p
      v-if="hint"
      :id="hintId"
      class="uk-field__hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style>
.uk-field {
  display: flex;
  flex-direction: column;
  gap: var(--uk-space-1);
  font-family: var(--uk-font-family);
  color: var(--uk-color-text);
}

.uk-field__label {
  font-size: var(--uk-font-size-sm);
  font-weight: var(--uk-font-weight-medium);
}

.uk-field__required {
  color: var(--uk-color-danger);
  margin-inline-start: 0.125em;
}

.uk-field__input {
  padding-block: var(--uk-space-2);
  padding-inline: var(--uk-space-3);
  border: 1px solid var(--uk-color-border);
  border-radius: var(--uk-radius-md);
  background: var(--uk-color-surface);
  color: inherit;
  font: inherit;
  transition: border-color var(--uk-duration-fast);
}

.uk-field__input:focus-visible {
  outline: none;
  border-color: var(--uk-color-accent);
  box-shadow: var(--uk-focus-ring);
}

.uk-field--invalid .uk-field__input {
  border-color: var(--uk-color-danger);
}

.uk-field--disabled .uk-field__input {
  cursor: not-allowed;
  opacity: 0.55;
}

.uk-field__hint,
.uk-field__error {
  margin: 0;
  font-size: var(--uk-font-size-sm);
}

.uk-field__hint {
  color: var(--uk-color-text-muted);
}

.uk-field__error {
  color: var(--uk-color-danger);
}
</style>
