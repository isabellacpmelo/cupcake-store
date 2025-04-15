<!-- @format -->

<script setup>
const userInfo = ref([])

function openPopupOrder() {
  userInfo.value = JSON.parse(localStorage.getItem('orders'))
}

onMounted(async () => {
  openPopupOrder()
})
</script>

<template>
  <div>
    <div class="text-h6">Pedidos Realizados</div>
    <div v-for="order in userInfo" :key="order.id">
      <div class="my-3 font-bold flex justify-center">
        <!-- salvar data e horário do pedido -->
        11/04/25 10h21 - Pedido {{ order.id }}
      </div>
      <div>
        <strong class="mr-2">Nome:</strong>
        <span>{{ order.name }}</span>
      </div>
      <div>
        <strong class="mr-2">Endereço:</strong>
        <span>{{ order.address }}</span>
      </div>
      <div>
        <strong class="mr-2">Telefone:</strong>
        <span>{{ order.phone }}</span>
      </div>
      <div>
        <strong class="mr-2">Total:</strong>
        <span>{{ order.total }}</span>
      </div>
      <div class="my-1 font-semibold">Items ({{ order.items.length }}):</div>
      <div v-for="cupcake in order.items" :key="cupcake.name" class="mb-2">
        {{ cupcake.name }} - R${{ cupcake.price }}
      </div>
    </div>
  </div>
</template>
