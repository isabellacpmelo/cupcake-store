<!-- @format -->

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  activeItem: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['select'])

function onSelect(item) {
  emit('select', item)
}
</script>

<template>
  <nav class="navigation-menu">
    <button
      v-for="item in items"
      :key="item.label"
      class="nav-item"
      :class="{ active: activeItem === item.component }"
      @click="onSelect(item)"
    >
      <i :class="item.icon" />
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.navigation-menu {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
  background: linear-gradient(180deg, white 0%, var(--color-light) 100%);
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid var(--color-border);
  border-radius: 0.75rem;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.nav-item:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

.nav-item i {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .navigation-menu {
    gap: 1rem;
    padding: 1rem;
  }

  .nav-item {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}
</style>
