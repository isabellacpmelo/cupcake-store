<!-- @format -->

<script setup>
defineProps({
  currentComponent: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="content-section">
    <slot name="header" />

    <Transition name="component-fade" mode="out-in">
      <component
        :is="currentComponent"
        :key="currentComponent"
        class="component-content"
      />
    </Transition>
  </div>
</template>

<style scoped>
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

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.4s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .component-content {
    padding: 1rem;
  }
}
</style>
