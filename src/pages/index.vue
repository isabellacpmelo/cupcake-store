<script setup>
console.warn('Cupcake Store starting soon')
const cupcakeList = [
  {
    id: 1,
    name: 'Chocolate',
    price: 10,
  },
  {
    id: 2,
    name: 'Morango',
    price: 10,
  },
  {
    id: 3,
    name: 'Laranja',
    price: 8,
  },
  {
    id: 4,
    name: 'Nutela',
    price: 13,
  },
  {
    id: 5,
    name: 'Ovomalte',
    price: 13,
  },
]

const cupcakeBasket = ref([])
function addCupcake(cupcake) {
  cupcakeBasket.value.push(cupcake)
}

function removeCupcake(cupcake) {
  cupcakeBasket.value.splice(cupcakeBasket.value.indexOf(cupcake), 1)
}

function cupcakeAmountByFlavor(cupcake) {
  return cupcakeBasket.value.filter(c => c.name === cupcake.name).length
}
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 h-50 drop-shadow-lg flex justify-center items-center gap-4">
      <h1 class="text-[50px] font-bold drop-shadow-xl">
        Cupcake Store
      </h1>
      <img class="w-[55px] h-[55px] drop-shadow-xl" src="cupcake-icon.png" alt="cupcake-icon">
    </div>
    <div class="my-6 mx-32 p-2 text-[18px] text-center">
      <p class="mb-2">
        Cupcake Store é uma lojinha de cupcakes com a maior variedade de sabores que você vai encontrar!
      </p>
      <p>
        Confira abaixo os sabores disponíveis e aproveite essas delícias diretamente na sua casa!
      </p>
    </div>
    <div class="my-6 py-6 w-full flex justify-center">
      <div class="p-10 flex justify-center items-center bg-coolGray w-200">
        <div v-for="cupcake in cupcakeList" :key="cupcake.id" class="flex justify-center items-center gap-10 mb-4">
          <div class="flex justify-between items-center w-80">
            <div>
              <q-btn
                color="primary"
                icon="-"
                @click="removeCupcake(cupcake)"
              />
            </div>
            <div class="font-bold">
              ({{ cupcakeAmountByFlavor(cupcake) }}) {{ cupcake.name }} - R$ {{ cupcake.price }}
            </div>
            <div>
              <q-btn
                color="primary"
                icon="+"
                @click="addCupcake(cupcake)"
              />
            </div>
          </div>
          <q-btn color="primary">
            <div class="flex items-center justify-center gap-2">
              <i class="bi bi-cart" />
              <div>
                Adicionar ao carrinho
              </div>
            </div>
          </q-btn>
        </div>
      </div>
    </div>
    <div>
      {{ cupcakeBasket }}
    </div>
  </div>
</template>

<style scoped>

</style>
