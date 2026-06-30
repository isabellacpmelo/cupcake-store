<!-- @format -->

<script setup>
import Btn from '@/components/Btn.vue'
import Input from '@/components/Input.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  formErrors: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'close',
  'add-item',
  'remove-item',
  'clear-cart',
  'checkout',
  'validate-form',
  'update-field',
])

function updateField(field, value) {
  emit('update-field', { field, value })
}
</script>

<template>
  <Transition name="cart-popup">
    <section v-if="isOpen" id="cart-popup" class="cart-popup" aria-label="Seu carrinho">
      <header class="cart-popup-header">
        <h2 class="popup-title">
          <i class="bi bi-bag-check" />
          Seu Carrinho
        </h2>

        <button class="popup-minimize" aria-label="Minimizar carrinho" @click="emit('close')">
          <i class="bi bi-dash-lg" />
        </button>
      </header>

      <div class="cart-popup-body">
        <div v-if="items.length === 0" class="empty-cart">
          <i class="bi bi-bag-slash" />
          <p>Seu carrinho está vazio</p>
          <small>Adicione alguns cupcakes para começar!</small>
        </div>

        <div v-else class="cart-content">
          <div class="cart-items">
            <div v-for="item in items" :key="item.id" class="cart-item">
              <div class="item-header">
                <span class="item-emoji">{{ item.emoji }}</span>
                <div class="item-details">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="cart-qty-controls">
                    <Btn icon="dash-lg" variant="outline" size="sm" @click="emit('remove-item', item.id)" />
                    <span class="cart-qty-badge">{{ item.quantity }}</span>
                    <Btn icon="plus-lg" variant="primary" size="sm" @click="emit('add-item', item)" />
                  </div>
                </div>
              </div>
              <div class="item-price">R$ {{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>

          <div class="cart-total">
            <span>Total:</span>
            <strong>R$ {{ totalPrice.toFixed(2) }}</strong>
          </div>

          <div class="customer-form">
            <h3 class="form-title">Dados para Entrega</h3>
            <Input
              :model-value="form.name"
              label="Nome Completo"
              placeholder="João Silva"
              :error="formErrors.name"
              @update:modelValue="updateField('name', $event)"
              @blur="emit('validate-form')"
            />
            <Input
              :model-value="form.address"
              label="Endereço Completo"
              placeholder="Rua das Flores, 123"
              :error="formErrors.address"
              @update:modelValue="updateField('address', $event)"
              @blur="emit('validate-form')"
            />
            <Input
              :model-value="form.phone"
              label="Telefone"
              type="tel"
              placeholder="(11) 98765-4321"
              :maxlength="14"
              :error="formErrors.phone"
              @update:modelValue="updateField('phone', $event)"
              @blur="emit('validate-form')"
            />
          </div>

          <div class="cart-actions">
            <Btn
              label="Limpar Carrinho"
              icon="trash"
              variant="outline"
              size="md"
              full-width
              @click="emit('clear-cart')"
            />
            <Btn
              label="Finalizar Compra"
              icon="credit-card"
              icon-position="right"
              variant="primary"
              size="md"
              full-width
              @click="emit('checkout')"
            />
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.cart-popup {
  position: fixed;
  right: 1.5rem;
  bottom: 6rem;
  z-index: 45;
  width: min(430px, calc(100vw - 2rem));
  max-height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  border: 2px solid var(--color-primary-lighter);
  box-shadow: var(--shadow-xl);
}

.cart-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.2rem 1rem;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(160deg, #fff 0%, #fff6fb 100%);
}

.popup-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

.popup-minimize {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-lighter);
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.popup-minimize:hover {
  background: var(--color-primary);
  color: white;
}

.cart-popup-body {
  padding: 1.2rem;
  overflow-y: auto;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1rem;
  text-align: center;
}

.empty-cart i {
  font-size: 3rem;
  color: var(--color-primary-lighter);
}

.empty-cart p {
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.empty-cart small {
  color: var(--color-text-light);
  display: block;
  margin-top: 0.5rem;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: var(--color-light);
  border-radius: 0.75rem;
  border-left: 4px solid var(--color-primary);
}

.item-header {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.item-emoji {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.item-details {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.item-name {
  font-weight: 600;
  color: var(--color-dark);
  font-size: 0.95rem;
}

.cart-qty-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(236, 72, 153, 0.08);
  border: 1px solid rgba(236, 72, 153, 0.2);
  border-radius: 999px;
  padding: 0.2rem;
}

.cart-qty-controls :deep(.btn.sm) {
  width: 26px;
  height: 26px;
  min-width: 26px;
  padding: 0;
  border-radius: 999px;
  flex: 0 0 26px;
}

.cart-qty-controls :deep(.btn.sm .btn-icon) {
  font-size: 0.95rem;
  line-height: 1;
}

.cart-qty-controls :deep(.btn.outline) {
  border-width: 1px;
}

.cart-qty-badge {
  min-width: 26px;
  height: 26px;
  padding: 0 0.4rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid rgba(236, 72, 153, 0.25);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
}

.item-price {
  font-weight: 700;
  color: var(--color-primary);
  text-align: right;
  white-space: nowrap;
  margin-left: 1rem;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: linear-gradient(135deg, var(--color-primary-lighter) 0%, var(--color-light) 100%);
  border-radius: 0.75rem;
  font-weight: 700;
  color: var(--color-dark);
  font-size: 1.125rem;
  border-bottom: 3px solid var(--color-primary);
}

.customer-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.form-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart-popup-enter-active,
.cart-popup-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cart-popup-enter-from,
.cart-popup-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

@media (max-width: 768px) {
  .cart-items {
    max-height: 200px;
  }

  .cart-popup {
    right: 1rem;
    bottom: 5rem;
    width: calc(100vw - 2rem);
    max-height: calc(100vh - 7rem);
  }
}
</style>
