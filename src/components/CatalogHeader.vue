<!-- @format -->

<script setup>
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
  emit('select-component', component)
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
    <nav v-if="showMenu" class="navigation-menu">
      <button
        v-for="item in menuItems"
        :key="item.label"
        class="nav-item"
        :class="{ active: currentComponent === item.component }"
        @click="onSelect(item.component)"
      >
        <i :class="item.icon" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
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
