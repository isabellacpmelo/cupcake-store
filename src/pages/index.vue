<script setup>
const icon = ref(false)
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

const totalPrize = computed(() => cupcakeBasket.value.reduce((acc, cupcake) => acc + cupcake.price, 0))

function closePurchase() {
  console.warn('Compra finalizada')
  cupcakeBasket.value = []
}

const cupcakeBasketByFlavor = computed(() => cupcakeBasket.value.reduce((acc, cupcake) => {
  if (acc[cupcake.name])
    acc[cupcake.name].push(cupcake)
  else
    acc[cupcake.name] = [cupcake]
  return acc
}, {}))

const cupcakeBasketByFlavorAndAmount = computed(() => {
  return Object.entries(cupcakeBasketByFlavor.value).map(([flavor, cupcakes]) => {
    return {
      flavor,
      amount: cupcakes.length,
    }
  })
})

const cupcakeBasketByFlavorAndAmountSorted = computed(() => {
  return cupcakeBasketByFlavorAndAmount.value.sort((a, b) => a.flavor.localeCompare(b.flavor))
})
</script>

<template>
  <div>
    <q-dialog v-model="icon" position="right" full-height>
      <q-card class="column full-height" style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-xl">
            Carrinho <i class="bi bi-cart" />
          </div>
          <q-space />
          <q-btn v-close-popup icon="x" flat />
        </q-card-section>
        <q-card-section>
          <div
            v-if="cupcakeBasket.length === 0" class="mt-10"
          >
            Seu carrinho esta vazio
          </div>
          <div class="mt-10">
            <div
              v-for="cupcake in cupcakeBasketByFlavorAndAmountSorted"
              :key="cupcake.flavor"
            >
              {{ cupcake.amount }} x {{ cupcake.flavor }} - R$ {{ cupcake.amount * cupcakeBasket.find(c => c.name === cupcake.flavor).price }}
            </div>
          </div>
          <div v-if="cupcakeBasket.length > 0">
            Total: R$ {{ totalPrize }}
          </div>
          <div
            v-if="cupcakeBasket.length > 0"
            class="mt-10 flex justify-between items-center"
          >
            <q-btn
              outline
              color="primary"
              label="Limpar carrinho" @click="cupcakeBasket = []"
            />
            <q-btn
              color="purple"
              label="Finalizar compra"
              @click="closePurchase"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 h-50 drop-shadow-lg flex justify-center items-center gap-4">
      <h1 class="text-[50px] font-bold drop-shadow-xl">
        Cupcake Store
      </h1>
      <img class="w-[55px] h-[55px] drop-shadow-xl" src="/src/assets/images/cupcake-icon.png" alt="cupcake-icon">
    </div>
    <div class="my-6 mx-32 p-2 text-[18px] text-center">
      <p class="mb-2">
        Cupcake Store é uma lojinha de cupcakes com a maior variedade de sabores que você vai encontrar!
      </p>
      <p>
        Confira abaixo os sabores disponíveis e aproveite essas delícias diretamente na sua casa!
      </p>
    </div>
    <div class="my-6 py-6 w-full flex flex-col justify-center items-center">
      <div class="p-10 flex justify-center items-center bg-gradient-to-l from-pink-100  to-pink-200 drop-shadow-lg rounded w-200 mb-4">
        <div v-for="cupcake in cupcakeList" :key="cupcake.id" class="flex justify-center items-center mb-4">
          <div class="flex items-center gap-10 w-100">
            <div>
              <q-btn
                color="purple"
                icon="-"
                @click="removeCupcake(cupcake)"
              />
            </div>
            <div class="font-bold">
              {{ cupcakeAmountByFlavor(cupcake) }}
            </div>
            <div>
              <q-btn
                color="purple"
                icon="+"
                @click="addCupcake(cupcake)"
              />
            </div>
            <div class="font-bold">
              {{ cupcake.name }} - R$ {{ cupcake.price }}
            </div>
          </div>
          <!-- <q-btn color="primary">
            <div class="flex items-center justify-center gap-2">
              <div>
                Adicionar ao carrinho
              </div>
              <i class="bi bi-cart" />
            </div>
          </q-btn> -->
        </div>
      </div>
      <div>
        <q-btn
          color="purple"
          @click="icon = true"
        >
          <div class="flex items-center justify-center gap-2">
            <div>
              Ver carrinho
            </div>
            <i class="bi bi-cart" />
            <div>
              ({{ cupcakeBasket.length }})
            </div>
          </div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
