<!-- @format -->

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <button
    class="floating-cart-button"
    :class="{ 'is-hidden': isOpen }"
    :aria-expanded="isOpen"
    aria-controls="cart-popup"
    @click="emit('toggle')"
  >
    <i class="bi bi-bag-check-fill" />
    <span class="floating-cart-label">Carrinho</span>
    <span v-if="totalItems > 0" class="floating-cart-count">{{ totalItems }}</span>
  </button>
</template>

<style scoped>
.floating-cart-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 40;
  height: 3.6rem;
  padding: 0 1.2rem;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 16px 34px rgba(236, 72, 153, 0.35);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease;
}

.floating-cart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(236, 72, 153, 0.4);
}

.floating-cart-button.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.floating-cart-button i {
  font-size: 1.1rem;
}

.floating-cart-count {
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  background: white;
  color: var(--color-primary-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0 0.25rem;
}

@media (max-width: 768px) {
  .floating-cart-button {
    right: 1rem;
    bottom: 1rem;
  }

  .floating-cart-label {
    display: none;
  }
}
</style>
