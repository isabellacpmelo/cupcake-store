<!-- @format -->

<script setup>
import { onMounted } from 'vue'
import { useOrders } from '@/composables/useOrders'

const { orders } = useOrders()

onMounted(() => {
  // Os pedidos já são carregados pelo composable
})
</script>

<template>
  <div class="orders-container">
    <div class="orders-header">
      <h2 class="orders-title">
        <i class="bi bi-receipt" />
        Seus Pedidos
      </h2>
      <p class="orders-subtitle">Histórico de compras realizadas</p>
    </div>

    <div v-if="orders.length === 0" class="empty-orders">
      <i class="bi bi-inbox" />
      <p>Nenhum pedido realizado ainda</p>
      <small>Faça seu primeiro pedido para aparecera aqui!</small>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <!-- Header do Pedido -->
        <div class="order-header">
          <div class="order-info">
            <span class="order-number">Pedido #{{ String(order.id).padStart(3, '0') }}</span>
            <span class="order-date">{{ order.formattedDate }}</span>
          </div>
          <div class="order-total">R$ {{ order.total.toFixed(2) }}</div>
        </div>

        <!-- Detalhes do Pedido -->
        <div class="order-details">
          <div class="detail-block">
            <h4 class="detail-label">Cliente</h4>
            <p class="detail-value">{{ order.name }}</p>
          </div>

          <div class="detail-block">
            <h4 class="detail-label">Endereço de Entrega</h4>
            <p class="detail-value">{{ order.address }}</p>
          </div>

          <div class="detail-block">
            <h4 class="detail-label">Telefone para Contato</h4>
            <p class="detail-value">{{ order.phone }}</p>
          </div>
        </div>

        <!-- Itens Pedidos -->
        <div class="order-items">
          <h4 class="items-title">Itens Pedidos ({{ order.items.length }})</h4>
          <div class="items-list">
            <div v-for="item in order.items" :key="`${order.id}-${item.id}`" class="item-row">
              <span class="item-emoji">{{ item.emoji }}</span>
              <span class="item-name">{{ item.name }}</span>
              <span class="item-qty">{{ item.quantity }}x</span>
              <span class="item-price">R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Status do Pedido -->
        <div class="order-status">
          <i class="bi bi-check-circle-fill" />
          <span>Pedido confirmado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.orders-header {
  text-align: center;
  margin-bottom: 1rem;
}

.orders-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.orders-title i {
  font-size: 2rem;
}

.orders-subtitle {
  margin: 0.5rem 0 0 0;
  color: var(--color-text-light);
  font-size: 1rem;
}

.empty-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;
  background: var(--color-light);
  border-radius: 1rem;
  border: 2px dashed var(--color-border);
}

.empty-orders i {
  font-size: 3rem;
  color: var(--color-primary-lighter);
}

.empty-orders p {
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.empty-orders small {
  color: var(--color-text-light);
  display: block;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  border: 2px solid var(--color-primary-lighter);
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.1);
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(236, 72, 153, 0.2);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-primary-lighter);
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-number {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-primary);
}

.order-date {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.order-total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.order-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-light);
  border-radius: 0.75rem;
  border-left: 4px solid var(--color-primary);
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.detail-value {
  margin: 0;
  color: var(--color-text);
  line-height: 1.6;
  font-size: 0.95rem;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.items-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-light);
  border-radius: 0.75rem;
}

.item-row {
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.item-emoji {
  font-size: 1.5rem;
  text-align: center;
}

.item-name {
  color: var(--color-text);
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-qty {
  color: var(--color-text-light);
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.item-price {
  color: var(--color-primary);
  font-weight: 700;
  white-space: nowrap;
}

.order-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
  border-radius: 0.75rem;
  border: 1px solid var(--color-success);
  color: var(--color-success);
  font-weight: 600;
}

.order-status i {
  font-size: 1.25rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Responsivo */
@media (max-width: 768px) {
  .orders-container {
    gap: 1.5rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .order-details {
    grid-template-columns: 1fr;
  }

  .item-row {
    grid-template-columns: 30px 1fr 40px;
    gap: 0.75rem;
  }

  .item-qty {
    grid-column: 3 / 4;
  }

  .item-price {
    grid-column: 3 / 4;
  }
}
</style>
