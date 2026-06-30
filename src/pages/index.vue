<!-- @format -->

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import HeroIntro from '@/components/HeroIntro.vue'
import CatalogHeader from '@/components/CatalogHeader.vue'
import CatalogContentShell from '@/components/CatalogContentShell.vue'
import { useHeroIntroAnimation } from '@/composables/useHeroIntroAnimation'

const baseUrl = window.origin

const {
  isVisible,
  showTitle,
  typedText,
  showCatalogBtn,
  showMenu,
  heroPhase,
} = useHeroIntroAnimation()

const isOpen = ref(false)
const currentComponent = ref(null)

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
      <CatalogContentShell v-if="isOpen" :current-component="currentComponent">
        <template #header>
          <CatalogHeader
            :base-url="baseUrl"
            :show-menu="showMenu"
            :current-component="currentComponent"
            :menu-items="menuItems"
            @close="isOpen = false"
            @select-component="loadComponent"
          />
        </template>
      </CatalogContentShell>
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

</style>
