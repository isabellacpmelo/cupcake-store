<!-- @format -->

<script setup>
import TabMenu from '@/components/TabMenu.vue'

defineProps({
  baseUrl: {
    type: String,
    required: true,
  },
  showMenu: {
    type: Boolean,
    required: true,
  },
  currentComponent: {
    type: Object,
    default: null,
  },
  menuItems: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'select-component'])

function onClose() {
  emit('close')
}

function onSelect(component) {
  emit('select-component', component.component)
}
</script>

<template>
  <div class="header-compact">
    <div class="logo-compact">
      <img :src="`${baseUrl}/img/cupcake-special.png`" alt="Logo" class="logo-image" />
      <h1 class="logo-title">Cupcake Shop</h1>
    </div>
    <button class="close-button" @click="onClose" aria-label="Fechar">
      <i class="bi bi-x-lg" />
    </button>
  </div>

  <Transition name="menu-slide">
    <TabMenu
      v-if="showMenu"
      :items="menuItems"
      :active-item="currentComponent"
      @select="onSelect"
    />
  </Transition>
</template>

<style scoped>
.header-compact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 2px solid var(--color-primary-lighter);
  box-shadow: 0 2px 10px rgba(236, 72, 153, 0.1);
}

.logo-compact {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.logo-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.close-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary-lighter);
  color: var(--color-primary);
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: var(--color-primary);
  color: white;
  transform: rotate(90deg);
}

.menu-slide-enter-active {
  animation: slide-down 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header-compact {
    padding: 1rem;
  }
}
</style>
