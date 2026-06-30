<!-- @format -->

<template>
  <div class="input-group">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :mask="mask"
      class="input-field"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
    <span v-if="error" class="input-error">{{ error }}</span>
    <span v-if="helperText && !error" class="input-helper">{{ helperText }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: null,
  },
  mask: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'change', 'blur'])
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-field {
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.75rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: var(--color-text);
  transition: all 0.3s ease;
  background: white;
}

.input-field::placeholder {
  color: var(--color-text-light);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
  background: white;
}

.input-field:disabled {
  background: var(--color-light);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-error {
  font-size: 0.75rem;
  color: var(--color-danger);
  font-weight: 500;
}

.input-helper {
  font-size: 0.75rem;
  color: var(--color-text-light);
}
</style>
