<!-- @format -->

<script setup>
import { computed } from 'vue'
import Btn from '@/components/Btn.vue'
import Modal from '@/components/Modal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <Modal v-model="visible" title="Pedido Confirmado!" size="md">
    <div class="confirmation-content">
      <div class="success-icon">
        <i class="bi bi-check-circle" />
      </div>
      <p class="confirmation-message">
        Olá <strong>{{ order?.name }}</strong>, seu pedido foi realizado com sucesso!
      </p>

      <div class="confirmation-details">
        <div class="detail-section">
          <h4>Itens Pedidos</h4>
          <div class="items-summary">
            <div v-for="item in order?.items" :key="item.id" class="summary-item">
              <span>{{ item.emoji }} {{ item.name }}</span>
              <span>{{ item.quantity }}x - R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="total-summary">
            <span>Total:</span>
            <strong>R$ {{ order?.total.toFixed(2) }}</strong>
          </div>
        </div>

        <div class="detail-section">
          <h4>Endereço de Entrega</h4>
          <p class="detail-text">{{ order?.address }}</p>
        </div>

        <div class="detail-section">
          <h4>Telefone para Contato</h4>
          <p class="detail-text">{{ order?.phone }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <Btn label="Fechar" variant="primary" size="md" @click="visible = false" />
    </template>
  </Modal>
</template>

<style scoped>
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
</style>
