<!-- @format -->

<script setup>
import { ref, shallowRef, markRaw, defineAsyncComponent } from 'vue'
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
const currentComponent = shallowRef(null)

const About = markRaw(defineAsyncComponent(() => import('@/assets/views/About.vue')))
const Products = markRaw(defineAsyncComponent(() => import('@/assets/views/Products.vue')))
const Orders = markRaw(defineAsyncComponent(() => import('@/assets/views/Orders.vue')))

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
  loadComponent(Products)
  isOpen.value = true
}

function loadComponent(component) {
  currentComponent.value = component
}
</script>

<template>
  <div class="page-container">
    <Transition name="screen-switch" mode="out-in">
      <HeroIntro
        v-if="!isOpen"
        key="hero"
        :base-url="baseUrl"
        :is-visible="isVisible"
        :show-title="showTitle"
        :typed-text="typedText"
        :show-catalog-btn="showCatalogBtn"
        :hero-phase="heroPhase"
        @open-catalog="openCatalog"
      />

      <CatalogContentShell v-else key="catalog" :current-component="currentComponent">
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

.screen-switch-enter-active,
.screen-switch-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.screen-switch-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.screen-switch-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
