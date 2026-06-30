<!-- @format -->

<template>
  <button
    class="btn"
    :class="{
      [variant]: true,
      [size]: true,
      'btn-disabled': disabled,
      'btn-full-width': fullWidth,
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <i v-if="icon && iconPosition === 'left'" :class="`bi bi-${icon}`" class="btn-icon" />
    <span v-if="label" class="btn-label">{{ label }}</span>
    <i v-if="icon && iconPosition === 'right'" :class="`bi bi-${icon}`" class="btn-icon" />
  </button>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: value => ['left', 'right'].includes(value),
  },
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.75rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: inherit;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

/* Tamanhos */
.btn.sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn.md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn.lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variantes */
.btn.primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

.btn.primary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
}

.btn.primary:active:not(.btn-disabled) {
  transform: translateY(0);
}

.btn.secondary {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #ea580c 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.btn.secondary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
}

.btn.secondary:active:not(.btn-disabled) {
  transform: translateY(0);
}

.btn.outline {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
}

.btn.outline:hover:not(.btn-disabled) {
  background: var(--color-primary-lighter);
}

.btn.ghost {
  color: var(--color-primary);
  background: transparent;
}

.btn.ghost:hover:not(.btn-disabled) {
  background: var(--color-primary-lighter);
}

.btn.danger {
  background: linear-gradient(135deg, var(--color-danger) 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.btn.danger:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.btn.danger:active:not(.btn-disabled) {
  transform: translateY(0);
}

/* Estado desabilitado */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Largura completa */
.btn-full-width {
  width: 100%;
}

/* Ícone */
.btn-icon {
  font-size: 1.25em;
  display: inline-flex;
  align-items: center;
}

.btn-label {
  font-weight: 600;
  letter-spacing: 0.3px;
}
</style>
