<!-- @format -->

<script setup>
defineProps({
  baseUrl: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
  showTitle: {
    type: Boolean,
    required: true,
  },
  typedText: {
    type: String,
    required: true,
  },
  showCatalogBtn: {
    type: Boolean,
    required: true,
  },
  heroPhase: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['open-catalog'])

function onOpenCatalog() {
  emit('open-catalog')
}
</script>

<template>
  <div class="hero-section" :class="heroPhase">
    <div class="cupcake-slot">
      <div class="cupcake-wrapper" :class="{ visible: isVisible }">
        <img
          :src="`${baseUrl}/img/cupcake-special.png`"
          alt="Cupcake Especial"
          class="cupcake-image"
        />
      </div>
    </div>

    <div class="title-slot">
      <div class="title-wrapper" :class="{ visible: showTitle }">
        <h1 class="main-title">{{ typedText }}<span class="cursor">|</span></h1>
        <p class="subtitle">Doces Deliciosos Feitos com Amor</p>
      </div>
    </div>

    <div class="scroll-slot">
      <div class="scroll-indicator" :class="{ visible: showCatalogBtn }">
        <button
          type="button"
          class="scroll-button"
          @click="onOpenCatalog"
          :tabindex="showCatalogBtn ? 0 : -1"
          :disabled="!showCatalogBtn"
          aria-label="Explorar catálogo"
        >
          <i class="bi bi-chevron-down" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  transform: translateY(0);
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-section.phase-title {
  transform: translateY(-18px);
}

.hero-section.phase-button {
  transform: translateY(-38px);
}

.cupcake-slot,
.title-slot,
.scroll-slot {
  width: 100%;
  display: flex;
  justify-content: center;
}

.title-slot {
  min-height: 132px;
}

.scroll-slot {
  min-height: 80px;
}

.cupcake-wrapper {
  position: relative;
  opacity: 0;
  transform: translateY(18px) scale(0.9);
  transition:
    opacity 600ms ease,
    transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

.cupcake-wrapper.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@keyframes cupcake-float {
  0%,
  100% {
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
  animation: cupcake-float 4.2s cubic-bezier(0.42, 0, 0.2, 1) 0.9s infinite;
  will-change: transform;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: title-glow 2s ease-in-out infinite;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 500ms ease,
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.title-wrapper.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes title-glow {
  0%,
  100% {
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
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
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
  opacity: 0;
  transform: translateY(14px);
  pointer-events: none;
  transition:
    opacity 450ms ease,
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-indicator.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  animation: bounce-up 2s ease-in-out infinite;
}

@keyframes bounce-up {
  0%,
  100% {
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
}
</style>
