/** @format */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export function useHeroIntroAnimation(options = {}) {
  const {
    fullText = 'CUPCAKE SHOP',
    cupcakeDelay = 300,
    titleDelay = 900,
    buttonDelay = 3500,
    menuDelay = 4000,
    typingDelay = 80,
  } = options

  const isVisible = ref(false)
  const showTitle = ref(false)
  const typedText = ref('')
  const showCatalogBtn = ref(false)
  const showMenu = ref(false)

  let typeIndex = 0
  const timeoutIds = []

  const heroPhase = computed(() => {
    if (showCatalogBtn.value) return 'phase-button'
    if (showTitle.value) return 'phase-title'
    return 'phase-start'
  })

  function trackTimeout(callback, delay) {
    const id = setTimeout(callback, delay)
    timeoutIds.push(id)
    return id
  }

  function typeEffect() {
    if (typeIndex < fullText.length) {
      typedText.value += fullText[typeIndex]
      typeIndex += 1
      trackTimeout(typeEffect, typingDelay)
    }
  }

  function startSequence() {
    trackTimeout(() => {
      isVisible.value = true
    }, cupcakeDelay)

    trackTimeout(() => {
      showTitle.value = true
      typeEffect()
    }, titleDelay)

    trackTimeout(() => {
      showCatalogBtn.value = true
    }, buttonDelay)

    trackTimeout(() => {
      showMenu.value = true
    }, menuDelay)
  }

  function resetSequence() {
    for (const id of timeoutIds) {
      clearTimeout(id)
    }

    timeoutIds.length = 0
    typeIndex = 0
    isVisible.value = false
    showTitle.value = false
    typedText.value = ''
    showCatalogBtn.value = false
    showMenu.value = false
  }

  onMounted(() => {
    startSequence()
  })

  onBeforeUnmount(() => {
    resetSequence()
  })

  return {
    isVisible,
    showTitle,
    typedText,
    showCatalogBtn,
    showMenu,
    heroPhase,
    resetSequence,
  }
}
