<!-- @format -->

<script setup>
const baseUrl = window.origin
const isVisible = ref(false)
const showTitle = ref(false)
const typedText = ref('')
const fullText = 'Cupcake Shop'
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

function openCatalog() {
  isOpen.value = true
  activeCatalogBtn.value = false
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
      class="flex flex-col justify-center items-center overflow-hidden">
      <div class="flex justify-center items-center">
        <Transition name="zoom">
          <img
            v-if="isVisible"
            :src="`${baseUrl}/img/cupcake-special.png`"
            class="brightness-125"
            :class="isOpen ? 'h-[250px]' : 'h-[500px]'" />
        </Transition>

        <h1
          v-if="showTitle"
          :class="isOpen ? 'text-5xl -ml-10 mr-10' : '-ml-20 mr-20 text-8xl '"
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
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
