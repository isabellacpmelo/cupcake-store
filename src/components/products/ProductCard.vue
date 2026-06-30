<!-- @format -->

<script setup>
import Btn from '@/components/Btn.vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['add', 'remove'])
</script>

<template>
  <article class="product-card">
    <div class="product-info">
      <div class="product-heading">
        <div class="product-emoji">{{ product.emoji }}</div>
        <h3 class="product-name">{{ product.name }}</h3>
      </div>
      <p class="product-description">{{ product.description }}</p>
    </div>

    <div class="product-actions">
      <div class="product-price">R$ {{ product.price.toFixed(2) }}</div>

      <div class="product-controls">
        <Btn
          icon="dash-lg"
          variant="outline"
          size="sm"
          :disabled="quantity === 0"
          @click="emit('remove', product.id)"
        />
        <span class="quantity-badge">{{ quantity }}</span>
        <Btn icon="plus-lg" variant="primary" size="sm" @click="emit('add', product)" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem 1.1rem;
  background: linear-gradient(165deg, #fffafc 0%, #ffffff 62%, #fff6fb 100%);
  border-radius: 0.9rem;
  border: 1px solid rgba(236, 72, 153, 0.16);
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
  box-shadow: 0 8px 18px rgba(190, 24, 93, 0.08);
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.45) 35%, transparent 100%);
}

.product-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-primary);
  box-shadow: 0 16px 30px rgba(190, 24, 93, 0.16);
}

.product-emoji {
  font-size: 2rem;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 30%, #fff 0%, #fde6f3 75%);
  box-shadow: inset 0 0 0 1px rgba(236, 72, 153, 0.12);
}

.product-info {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.product-heading {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.product-name {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--color-dark);
  margin: 0;
}

.product-description {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin: 0;
  line-height: 1.42;
  line-clamp: 2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-width: 108px;
  padding-left: 0.95rem;
  border-left: 1px solid rgba(236, 72, 153, 0.16);
}

.product-price {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  background: linear-gradient(135deg, #fff 0%, #ffe7f4 100%);
  border: 1px solid rgba(236, 72, 153, 0.24);
  padding: 0.42rem 0.6rem;
  border-radius: 999px;
  box-shadow: inset 0 -1px 0 rgba(236, 72, 153, 0.08);
}

.product-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  background: rgba(236, 72, 153, 0.08);
  border: 1px solid rgba(236, 72, 153, 0.2);
  border-radius: 999px;
  padding: 0.22rem;
}

.product-controls :deep(.btn.sm) {
  width: 30px;
  height: 30px;
  min-width: 30px;
  padding: 0;
  border-radius: 999px;
  flex: 0 0 30px;
}

.product-controls :deep(.btn.sm .btn-icon) {
  font-size: 1rem;
  line-height: 1;
}

.product-controls :deep(.btn.outline) {
  border-width: 1px;
}

.quantity-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 999px;
  border: 1px solid rgba(236, 72, 153, 0.25);
  font-weight: 600;
  color: var(--color-primary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .product-card {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 0.85rem;
  }

  .product-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    padding-top: 0.75rem;
    border-left: none;
    border-top: 1px solid rgba(236, 72, 153, 0.16);
  }
}
</style>
