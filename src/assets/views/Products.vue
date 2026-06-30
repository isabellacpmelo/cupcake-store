<!-- @format -->

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/products/ProductCard.vue'
import FloatingCartButton from '@/components/products/FloatingCartButton.vue'
import CartPopup from '@/components/products/CartPopup.vue'
import OrderConfirmationModal from '@/components/products/OrderConfirmationModal.vue'
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

const quantityByProduct = computed(() => {
  const map = {}
  items.value.forEach((item) => {
    map[item.id] = item.quantity
  })
  return map
})

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

const resetForm = () => {
  form.value = {
    name: '',
    address: '',
    phone: '',
  }
  formErrors.value = {}
}

const handleClearCart = () => {
  clearCart()
  resetForm()
}

const handleCheckout = () => {
  if (!validateForm() || items.value.length === 0) {
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

const handleFormFieldUpdate = ({ field, value }) => {
  form.value[field] = value
}
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
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :quantity="quantityByProduct[product.id] || 0"
          @add="handleAddItem"
          @remove="handleRemoveItem"
        />
      </div>
    </div>

    <FloatingCartButton :is-open="isCartOpen" :total-items="totalItems" @toggle="toggleCart" />

    <CartPopup
      :is-open="isCartOpen"
      :items="items"
      :total-price="totalPrice"
      :form="form"
      :form-errors="formErrors"
      @close="closeCart"
      @add-item="handleAddItem"
      @remove-item="handleRemoveItem"
      @clear-cart="handleClearCart"
      @checkout="handleCheckout"
      @validate-form="validateForm"
      @update-field="handleFormFieldUpdate"
    />

    <OrderConfirmationModal v-model="showConfirmation" :order="lastOrder" />
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
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1rem;
}

@media (max-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  }
}

@media (max-width: 768px) {
  .products-container {
    padding: 1rem 0.75rem 6.5rem;
  }

  .products-list {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
