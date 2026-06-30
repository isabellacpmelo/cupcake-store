<!-- @format -->

<script setup>
import { ref, computed, defineAsyncComponent, onMounted } from 'vue'
import HeroIntro from '@/components/HeroIntro.vue'
import CatalogHeader from '@/components/CatalogHeader.vue'

const baseUrl = window.origin
const isVisible = ref(false)
const showTitle = ref(false)
const typedText = ref('')
const fullText = 'CUPCAKE SHOP'
let typeIndex = 0

function typeEffect() {
  if (typeIndex < fullText.length) {
    typedText.value += fullText[typeIndex]
    typeIndex++
    setTimeout(typeEffect, 80)
  }
}

const showCatalogBtn = ref(false)
const showMenu = ref(false)
const isOpen = ref(false)
const currentComponent = ref(null)

const heroPhase = computed(() => {
  if (showCatalogBtn.value) return 'phase-button'
  if (showTitle.value) return 'phase-title'
  return 'phase-start'
})

const About = defineAsyncComponent(() => import('@/assets/views/About.vue'))
const Products = defineAsyncComponent(() => import('@/assets/views/Products.vue'))
const Orders = defineAsyncComponent(() => import('@/assets/views/Orders.vue'))

const menuItems = [
  {
    label: 'Sobre Nós',
    icon: 'bi bi-info-circle',
    component: About,
  },
  {
    label: 'Produtos',
    icon: 'bi bi-shop',
    component: Products,
  },
  {
    label: 'Pedidos',
    icon: 'bi bi-bag-check',
    component: Orders,
  },
]

function openCatalog() {
  isOpen.value = true
  loadComponent(Products)
}

function loadComponent(component) {
  currentComponent.value = component
}

onMounted(() => {
  // Fase 1: Mostra o cupcake
  setTimeout(() => {
    isVisible.value = true
  }, 300)

  // Fase 2: Mostra o título com typing effect
  setTimeout(() => {
    showTitle.value = true
    typeEffect()
  }, 900)

  // Fase 3: Mostra o botão de descida
  setTimeout(() => {
    showCatalogBtn.value = true
  }, 3500)

  // Fase 4: Mostra o menu
  setTimeout(() => {
    showMenu.value = true
  }, 4000)
})
</script>

<template>
  <div class="page-container">
    <!-- Vista Principal (antes de abrir catálogo) -->
    <Transition name="fade-slide">
      <HeroIntro
        v-if="!isOpen"
        :base-url="baseUrl"
        :is-visible="isVisible"
        :show-title="showTitle"
        :typed-text="typedText"
        :show-catalog-btn="showCatalogBtn"
        :hero-phase="heroPhase"
        @open-catalog="openCatalog"
      />
    </Transition>

    <!-- Vista de Conteúdo (depois de abrir catálogo) -->
    <Transition name="content-appear">
      <div v-if="isOpen" class="content-section">
        <CatalogHeader
          :base-url="baseUrl"
          :show-menu="showMenu"
          :current-component="currentComponent"
          :menu-items="menuItems"
          @close="isOpen = false"
          @select-component="loadComponent"
        />

        <!-- Conteúdo Dinâmico -->
        <Transition name="component-fade" mode="out-in">
          <component
            :is="currentComponent"
            :key="currentComponent"
            class="component-content"
          />
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Content Section */
.content-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.component-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

/* Transições */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.content-appear-enter-active {
  animation: fade-in 0.5s ease-out;
}

.content-appear-leave-active {
  animation: fade-out 0.3s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.4s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .component-content {
    padding: 1rem;
  }
}
</style>
