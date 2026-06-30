<!-- @format -->

<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'

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

const About = defineAsyncComponent(() => import('@/assets/views/About.vue'))
const Products = defineAsyncComponent(() => import('@/assets/views/Products.vue'))
const Orders = defineAsyncComponent(() => import('@/assets/views/Orders.vue'))

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
      <div v-if="!isOpen" class="hero-section">
        <!-- Cupcake Animado -->
        <Transition name="cupcake-enter">
          <div v-if="isVisible" class="cupcake-wrapper">
            <img
              :src="`${baseUrl}/img/cupcake-special.png`"
              alt="Cupcake Especial"
              class="cupcake-image"
            />
          </div>
        </Transition>

        <!-- Título com Typing Effect -->
        <Transition name="title-enter">
          <div v-if="showTitle" class="title-wrapper">
            <h1 class="main-title">{{ typedText }}<span class="cursor">|</span></h1>
            <p class="subtitle">Doces Deliciosos Feitos com Amor</p>
          </div>
        </Transition>

        <!-- Botão de Descida -->
        <Transition name="bounce-enter">
          <div v-if="showCatalogBtn" class="scroll-indicator">
            <button
              type="button"
              class="scroll-button"
              @click="openCatalog"
              aria-label="Explorar catálogo"
            >
              <i class="bi bi-chevron-down" />
            </button>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Vista de Conteúdo (depois de abrir catálogo) -->
    <Transition name="content-appear">
      <div v-if="isOpen" class="content-section">
        <!-- Header Compacto -->
        <div class="header-compact">
          <div class="logo-compact">
            <img
              :src="`${baseUrl}/img/cupcake-special.png`"
              alt="Logo"
              class="logo-image"
            />
            <h1 class="logo-title">Cupcake Shop</h1>
          </div>
          <button class="close-button" @click="isOpen = false" aria-label="Fechar">
            <i class="bi bi-x-lg" />
          </button>
        </div>

        <!-- Menu de Navegação -->
        <Transition name="menu-slide">
          <nav v-if="showMenu" class="navigation-menu">
            <button
              class="nav-item"
              :class="{ active: currentComponent === About }"
              @click="loadComponent(About)"
            >
              <i class="bi bi-info-circle" />
              <span>Sobre Nós</span>
            </button>
            <button
              class="nav-item"
              :class="{ active: currentComponent === Products }"
              @click="loadComponent(Products)"
            >
              <i class="bi bi-shop" />
              <span>Produtos</span>
            </button>
            <button
              class="nav-item"
              :class="{ active: currentComponent === Orders }"
              @click="loadComponent(Orders)"
            >
              <i class="bi bi-bag-check" />
              <span>Pedidos</span>
            </button>
          </nav>
        </Transition>

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

/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.cupcake-wrapper {
  position: relative;
  animation: cupcake-float 4s ease-in-out infinite;
}

@keyframes cupcake-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.cupcake-image {
  width: 280px;
  height: 280px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(236, 72, 153, 0.2));
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: title-glow 2s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
  }
  50% {
    text-shadow: 0 0 40px rgba(236, 72, 153, 0.5);
  }
}

.main-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: 2px;
  margin: 0;
  line-height: 1.2;
}

.cursor {
  animation: blink 1s infinite;
  margin-left: 0.2em;
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text-light);
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
}

.scroll-indicator {
  display: flex;
  justify-content: center;
  animation: bounce-up 2s ease-in-out infinite;
}

@keyframes bounce-up {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.scroll-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary-lighter) 0%, var(--color-primary-lighter) 100%);
  color: var(--color-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
}

.scroll-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
}

/* Content Section */
.content-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.cupcake-enter-enter-active {
  animation: scale-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scale-pop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.title-enter-enter-active {
  animation: fade-in-slide-up 0.8s ease-out 0.3s both;
}

@keyframes fade-in-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bounce-enter-enter-active {
  animation: fade-in-bounce 0.8s ease-out 0.5s both;
}

@keyframes fade-in-bounce {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  .hero-section {
    gap: 2rem;
    padding: 1rem;
  }

  .cupcake-image {
    width: 200px;
    height: 200px;
  }

  .main-title {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .subtitle {
    font-size: 1rem;
  }

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

  .component-content {
    padding: 1rem;
  }
}
</style>
