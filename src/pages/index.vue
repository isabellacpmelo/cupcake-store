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
            <div v-for="cupcake in cupcakeBasket" :key="cupcake.id">
              {{ cupcake.name }} - R$ {{ cupcake.price }} ({{ cupcakeAmountByFlavor(cupcake) }})
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
              color="primary"
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
    <div class="my-6 py-6 w-full flex flex-col justify-center items-center">
      <div class="p-10 flex justify-center items-center bg-coolGray w-200 mb-4">
        <div v-for="cupcake in cupcakeList" :key="cupcake.id" class="flex justify-center items-center gap-10 mb-4">
          <div class="flex justify-between items-center w-100">
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
          color="primary"
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
