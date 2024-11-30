<script setup>
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

const openCart = ref(false)
function openCartPopup() {
  openCart.value = true
}

function closeCartPopup() {
  openCart.value = false
}

const userName = ref('')
const userAdress = ref('')
const userPhone = ref('')

function clearBasket() {
  cupcakeBasket.value = []
  userName.value = ''
  userAdress.value = ''
  userPhone.value = ''
}

const userInfo = ref([])
const latestOrder = ref({})

function closePurchase() {
  const orders = JSON.parse(localStorage.getItem('orders')) || []

  const nextId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1

  const newOrder = {
    id: nextId,
    name: userName.value,
    address: userAdress.value,
    phone: userPhone.value,
    total: totalPrize.value,
    items: cupcakeBasket.value,
  }

  orders.push(newOrder)

  localStorage.setItem('orders', JSON.stringify(orders))
  userInfo.value = orders
  latestOrder.value = newOrder

  clearBasket()
}

const popupOrder = ref(false)
function openPopupOrder() {
  userInfo.value = JSON.parse(localStorage.getItem('orders'))
  popupOrder.value = true
}
</script>

<template>
  <div>
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
        </div>
      </div>
      <div class="flex gap-4">
        <q-btn
          outline
          color="purple"
          @click="openPopupOrder"
        >
          <div class="flex items-center justify-center gap-2">
            <div>
              Ver Pedidos
            </div>
            <i class="bi bi-cart-check-fill" />
            <div>
              ({{ cupcakeBasket.length }})
            </div>
          </div>
        </q-btn>
        <q-btn
          color="purple"
          @click="openCartPopup"
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
    <q-dialog v-model="openCart" position="right" full-height>
      <q-card class="column full-height" style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-xl">
            Carrinho <i class="bi bi-cart" />
          </div>
          <q-space />
          <q-btn flat rounded @click="closeCartPopup">
            <i class="bi bi-x" />
          </q-btn>
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
          <div v-if="cupcakeBasket.length > 0">
            <q-input
              v-model="userName"
              label="Digite seu nome completo"
              hint="Nome e sobrenome"
            />
            <q-input
              v-model="userAdress"
              label="Digite seu endereço completo"
            />
            <q-input
              v-model="userPhone"
              mask="(##) #####-####"
              label="Digite seu telefone para entrarmos em contato"
            />
          </div>
          <div
            v-if="cupcakeBasket.length > 0"
            class="mt-10 flex justify-between items-center"
          >
            <q-btn
              outline
              color="primary"
              label="Limpar carrinho" @click="clearBasket"
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
    <q-dialog v-model="popupOrder">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Pedidos Realizados
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div
            v-for="order in userInfo"
            :key="order.id"
          >
            <div class="my-3 font-bold">{{ order.id }} - {{ order.name }}</div>
            <div>Endereço: {{ order.address }}</div>
            <div>Telefone: {{ order.phone }}</div>
            <div>Total: R${{ order.total }}</div>
            <div class="my-1 font-semibold">
              Items ({{ order.items.length }}):
            </div>
            <div
              v-for="cupcake in order.items"
              :key="cupcake.name"
              class="mb-2"
            >
              {{ cupcake.name }} - R${{ cupcake.price }}
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="popupOrder = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

</style>
