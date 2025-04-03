<!-- @format -->
<!-- eslint-disable no-console -->

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

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
    setTimeout(() => {
      showTitle.value = true
      typeEffect()
    }, 1000)
  }, 500)
})
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="flex justify-center items-center">
      <Transition name="zoom">
        <img
          v-if="isVisible"
          :src="`${baseUrl}/img/cupcake-special.png`"
          class="h-[500px] brightness-125" />
      </Transition>

      <h1 v-if="showTitle" class="text-8xl -ml-20 font-bold text-sky-800">
        {{ typedText }}
      </h1>
    </div>
    <div class="mt-20 hidden">
      <button type="button">
        <i class="bi-arrow-down-circle text-5xl text-sky-800 animate-bounce" />
      </button>
    </div>
  </div>
</template>

<style scoped>
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
