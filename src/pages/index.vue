<!-- @format -->

<script setup>
const baseUrl = window.origin
const isVisible = ref(false)
const showTitle = ref(false)
const typedText = ref('')
const fullText = 'CUPCAKE SHOP'
let index = 0

function typeEffect() {
  if (index < fullText.length) {
    typedText.value += fullText[index]
    index++
    setTimeout(typeEffect, 50)
  }
}

const activeCatalogBtn = ref(false)
const isOpen = ref(false)
const currentComponent = ref(null)

const About = defineAsyncComponent(() => import('@/assets/views/About.vue'))
const Products = defineAsyncComponent(() =>
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  import('@/assets/views/Products.vue')
)
const Orders = defineAsyncComponent(() => import('@/assets/views/Orders.vue'))

function openCatalog() {
  isOpen.value = true
  activeCatalogBtn.value = false
}

function loadComponent(component) {
  currentComponent.value = component
}

onMounted(async () => {
  setTimeout(() => {
    isVisible.value = true
    setTimeout(() => {
      showTitle.value = true
      typeEffect()
    }, 1000)
  }, 500)

  await delay(2.5)
  activeCatalogBtn.value = true
})
</script>

<template>
  <Transition name="slide">
    <div
      :key="isOpen"
      :class="isOpen ? '' : 'h-screen'"
      class="flex flex-col justify-center items-center overflow-hidden my-10">
      <div class="flex justify-center items-center gap-4">
        <Transition name="zoom">
          <img
            v-if="isVisible"
            :src="`${baseUrl}/img/cupcake-special.png`"
            class="brightness-125"
            :class="isOpen ? 'h-[100px]' : 'h-[300px]'" />
        </Transition>

        <h1
          v-if="showTitle"
          :class="isOpen ? 'text-3xl' : 'text-6xl '"
          class="font-bold text-sky-800">
          {{ typedText }}
        </h1>
      </div>
      <Transition name="zoom">
        <div v-if="activeCatalogBtn" class="mt-20">
          <button
            type="button"
            class="pulse w-12 h-12 rounded-full flex justify-center items-center"
            @click="openCatalog">
            <i
              class="bi-arrow-down-circle text-5xl text-sky-800 animate-bounce rounded-full" />
          </button>
        </div>
      </Transition>
      <Transition name="zoom">
        <div v-if="isOpen" class="my-20">
          <div class="gap-12 text-sky-800">
            <div class="flex justify-center items-center gap-4 text-lg">
              <button
                class="hover:text-sky-800/60 hover:border-b-1 hover:border-sky-800/60"
                @click="loadComponent(About)">
                Sobre Nós
              </button>
              <div class="h-7 border-0.5 border-sky-800/60" />
              <button
                class="hover:text-sky-800/60 hover:border-b-1 hover:border-sky-800/60"
                @click="loadComponent(Products)">
                Nossos Produtos
              </button>
              <div class="h-7 border-0.5 border-sky-800/60" />
              <button
                class="hover:text-sky-800/60 hover:border-b-1 hover:border-sky-800/60"
                @click="loadComponent(Orders)">
                Seus Pedidos
              </button>
            </div>
          </div>
          <component :is="currentComponent" class="mt-10" />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-25%);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.5);
  opacity: 0.1;
}
</style>
