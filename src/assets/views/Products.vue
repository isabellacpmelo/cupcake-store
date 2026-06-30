<!-- @format -->

<script setup>
import { ref, computed } from 'vue'
import Btn from '@/components/Btn.vue'
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'
import { useOrders } from '@/composables/useOrders'

const { products } = useProducts()
const { items, addItem, removeItem, clearCart, totalPrice, totalItems } = useCart()
const { createOrder } = useOrders()

const isCartOpen = ref(false)

const form = ref({
  name: '',
  address: '',
  phone: '',
})

const formErrors = ref({})
const showConfirmation = ref(false)
const lastOrder = ref(null)

const validateForm = () => {
  formErrors.value = {}

  if (!form.value.name.trim()) {
    formErrors.value.name = 'Nome é obrigatório'
  }

  if (!form.value.address.trim()) {
    formErrors.value.address = 'Endereço é obrigatório'
  }

  if (!form.value.phone.trim() || form.value.phone.length < 14) {
    formErrors.value.phone = 'Telefone inválido'
  }

  return Object.keys(formErrors.value).length === 0
}

const handleAddItem = (product) => {
  addItem(product)
}

const handleRemoveItem = (productId) => {
  removeItem(productId)
}

const handleClearCart = () => {
  clearCart()
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    address: '',
    phone: '',
  }
  formErrors.value = {}
}

const handleCheckout = () => {
  if (!validateForm()) {
    return
  }

  if (items.value.length === 0) {
    return
  }

  lastOrder.value = createOrder(form.value, items.value)
  clearCart()
  resetForm()
  isCartOpen.value = false
  showConfirmation.value = true
}

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const closeCart = () => {
  isCartOpen.value = false
}

const quantityByProduct = computed(() => {
  const map = {}
  items.value.forEach((item) => {
    map[item.id] = item.quantity
  })
  return map
})
</script>

<template>
  <div class="products-container">
    <div class="products-grid">
      <div class="section-header">
        <h2 class="section-title">
          <i class="bi bi-shop" />
          Nossos Cupcakes
        </h2>
        <p class="section-subtitle">Escolha seus sabores favoritos</p>
      </div>

      <div class="products-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-emoji">{{ product.emoji }}</div>

          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">R$ {{ product.price.toFixed(2) }}</div>
          </div>

          <div class="product-controls">
            <Btn
              icon="dash-circle"
              variant="outline"
              size="sm"
              @click="handleRemoveItem(product.id)"
              :disabled="!quantityByProduct[product.id]"
            />
            <span class="quantity-badge">{{ quantityByProduct[product.id] || 0 }}</span>
            <Btn icon="plus-circle" variant="primary" size="sm" @click="handleAddItem(product)" />
          </div>
        </div>
      </div>
    </div>

    <button
      class="floating-cart-button"
      :class="{ 'is-hidden': isCartOpen }"
      @click="toggleCart"
      :aria-expanded="isCartOpen"
      aria-controls="cart-popup"
    >
      <i class="bi bi-bag-check-fill" />
      <span class="floating-cart-label">Carrinho</span>
      <span v-if="totalItems > 0" class="floating-cart-count">{{ totalItems }}</span>
    </button>

    <Transition name="cart-popup">
      <section v-if="isCartOpen" id="cart-popup" class="cart-popup" aria-label="Seu carrinho">
        <header class="cart-popup-header">
          <h2 class="popup-title">
            <i class="bi bi-bag-check" />
            Seu Carrinho
          </h2>

          <button class="popup-minimize" @click="closeCart" aria-label="Minimizar carrinho">
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
                    <div class="item-quantity">Qtd: {{ item.quantity }}</div>
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
                v-model="form.name"
                label="Nome Completo"
                placeholder="João Silva"
                :error="formErrors.name"
                @blur="() => validateForm()"
              />
              <Input
                v-model="form.address"
                label="Endereço Completo"
                placeholder="Rua das Flores, 123"
                :error="formErrors.address"
                @blur="() => validateForm()"
              />
              <Input
                v-model="form.phone"
                label="Telefone"
                type="tel"
                placeholder="(11) 98765-4321"
                maxlength="14"
                :error="formErrors.phone"
                @blur="() => validateForm()"
              />
            </div>

            <div class="cart-actions">
              <Btn
                label="Limpar Carrinho"
                icon="trash"
                variant="outline"
                size="md"
                full-width
                @click="handleClearCart"
              />
              <Btn
                label="Finalizar Compra"
                icon="credit-card"
                icon-position="right"
                variant="primary"
                size="md"
                full-width
                @click="handleCheckout"
              />
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <Modal v-model="showConfirmation" title="Pedido Confirmado!" size="md">
      <div class="confirmation-content">
        <div class="success-icon">
          <i class="bi bi-check-circle" />
        </div>
        <p class="confirmation-message">
          Olá <strong>{{ lastOrder?.name }}</strong>, seu pedido foi realizado com sucesso!
        </p>

        <div class="confirmation-details">
          <div class="detail-section">
            <h4>Itens Pedidos</h4>
            <div class="items-summary">
              <div v-for="item in lastOrder?.items" :key="item.id" class="summary-item">
                <span>{{ item.emoji }} {{ item.name }}</span>
                <span>{{ item.quantity }}x - R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <div class="total-summary">
              <span>Total:</span>
              <strong>R$ {{ lastOrder?.total.toFixed(2) }}</strong>
            </div>
          </div>

          <div class="detail-section">
            <h4>Endereço de Entrega</h4>
            <p class="detail-text">{{ lastOrder?.address }}</p>
          </div>

          <div class="detail-section">
            <h4>Telefone para Contato</h4>
            <p class="detail-text">{{ lastOrder?.phone }}</p>
          </div>
        </div>
      </div>

      <template #footer>
        <Btn label="Fechar" variant="primary" size="md" @click="showConfirmation = false" />
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.products-container {
  position: relative;
  padding: 2rem 0 7rem;
}

.products-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1180px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.section-title i {
  font-size: 2rem;
}

.section-subtitle {
  margin: 0.5rem 0 0 0;
  color: var(--color-text-light);
  font-size: 1rem;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.5rem;
}

.product-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.15);
}

.product-emoji {
  font-size: 3rem;
  flex-shrink: 0;
}

.product-info {
  width: 100%;
  min-width: 0;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 0.25rem 0;
}

.product-description {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

.product-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: end;
}

.quantity-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-primary-lighter);
  border-radius: 0.5rem;
  font-weight: 600;
  color: var(--color-primary);
  font-size: 0.875rem;
}

.floating-cart-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 40;
  height: 3.6rem;
  padding: 0 1.2rem;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 16px 34px rgba(236, 72, 153, 0.35);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease;
}

.floating-cart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(236, 72, 153, 0.4);
}

.floating-cart-button.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.floating-cart-button i {
  font-size: 1.1rem;
}

.floating-cart-count {
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  background: white;
  color: var(--color-primary-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0 0.25rem;
}

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
}

.item-name {
  font-weight: 600;
  color: var(--color-dark);
  font-size: 0.95rem;
}

.item-quantity {
  font-size: 0.8rem;
  color: var(--color-text-light);
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

.confirmation-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.success-icon {
  font-size: 3rem;
  color: var(--color-success);
  animation: scale-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scale-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.confirmation-message {
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0;
  line-height: 1.6;
}

.confirmation-details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
}

.detail-section {
  padding: 1rem;
  background: var(--color-light);
  border-radius: 0.75rem;
}

.detail-section h4 {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.75rem 0;
}

.items-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: var(--color-text);
}

.total-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
}

.detail-text {
  margin: 0;
  color: var(--color-text);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .products-container {
    padding-bottom: 6.5rem;
  }

  .products-list {
    grid-template-columns: 1fr;
  }

  .product-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .product-controls {
    justify-content: center;
    align-self: center;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .cart-items {
    max-height: 200px;
  }

  .floating-cart-button {
    right: 1rem;
    bottom: 1rem;
  }

  .floating-cart-label {
    display: none;
  }

  .cart-popup {
    right: 1rem;
    bottom: 5rem;
    width: calc(100vw - 2rem);
    max-height: calc(100vh - 7rem);
  }
}
</style>
