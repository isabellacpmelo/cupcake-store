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
      <div class="my-3 font-bold">{{ order.id }} - {{ order.name }}</div>
      <div>Endereço: {{ order.address }}</div>
      <div>Telefone: {{ order.phone }}</div>
      <div>Total: R${{ order.total }}</div>
      <div class="my-1 font-semibold">Items ({{ order.items.length }}):</div>
      <div v-for="cupcake in order.items" :key="cupcake.name" class="mb-2">
        {{ cupcake.name }} - R${{ cupcake.price }}
      </div>
    </div>
  </div>
</template>
