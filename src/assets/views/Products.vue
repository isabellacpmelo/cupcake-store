<!-- @format -->

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
  return cupcakeBasket.value.filter((c) => c.name === cupcake.name).length
}

const totalPrize = computed(() =>
  cupcakeBasket.value.reduce((acc, cupcake) => acc + cupcake.price, 0)
)

const cupcakeBasketByFlavor = computed(() =>
  cupcakeBasket.value.reduce((acc, cupcake) => {
    if (acc[cupcake.name]) acc[cupcake.name].push(cupcake)
    else acc[cupcake.name] = [cupcake]
    return acc
  }, {})
)

const cupcakeBasketByFlavorAndAmount = computed(() => {
  return Object.entries(cupcakeBasketByFlavor.value).map(
    ([flavor, cupcakes]) => {
      return {
        flavor,
        amount: cupcakes.length,
      }
    }
  )
})

const cupcakeBasketByFlavorAndAmountSorted = computed(() => {
  return cupcakeBasketByFlavorAndAmount.value.sort((a, b) =>
    a.flavor.localeCompare(b.flavor)
  )
})

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

const popupConfirm = ref(false)
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

  popupConfirm.value = true
  clearBasket()
}
</script>

<template>
  <div>
    <div
      v-for="(cupcake, index) in cupcakeList"
      :key="index"
      class="my-2 grid grid-cols-3 justify-items-stretch items-center w-full">
      <div class="flex justify-center items-center gap-5 col-span-2">
        <div>
          <q-btn color="purple" icon="-" @click="removeCupcake(cupcake)" />
        </div>
        <div>{{ cupcakeAmountByFlavor(cupcake) }}</div>
        <div>
          <q-btn color="purple" icon="+" @click="addCupcake(cupcake)" />
        </div>
      </div>
      <div class="justify-self-auto">
        {{ cupcake.name }} - R$ {{ cupcake.price }}
      </div>
    </div>
    <div>
      <div class="text-xl w-full flex justify-center items-center mt-8">
        Carrinho <i class="ml-2 bi bi-cart" />
      </div>
      <div class="mt-10 w-full flex justify-center items-center">
        <div v-if="cupcakeBasket.length === 0">
          <p>Seu carrinho esta vazio</p>
        </div>
        <div v-else>
          <div
            v-for="cupcake in cupcakeBasketByFlavorAndAmountSorted"
            :key="cupcake.flavor"
            class="flex justify-center items-center">
            <div>
              <span>{{ cupcake.amount }} x {{ cupcake.flavor }} - R$</span>
              <span>{{
                cupcake.amount *
                cupcakeBasket.find((c) => c.name === cupcake.flavor).price
              }}</span>
            </div>
          </div>
          <div>
            <p>Total: R$ {{ totalPrize }}</p>
          </div>
          <div class="w-100">
            <q-input
              v-model="userName"
              label="Digite seu nome completo"
              hint="Nome e sobrenome" />
            <q-input
              v-model="userAdress"
              label="Digite seu endereço completo" />
            <q-input
              v-model="userPhone"
              mask="(##) #####-####"
              label="Digite seu telefone para entrarmos em contato" />
          </div>
          <div class="mt-10 flex justify-between items-center">
            <q-btn
              outline
              color="primary"
              label="Limpar carrinho"
              @click="clearBasket" />
            <q-btn
              color="purple"
              label="Finalizar compra"
              @click="closePurchase" />
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="popupConfirm">
      <div class="bg-white p-4">
        <div>
          <div class="text-h6">Confirmação de pedido</div>
        </div>

        <div class="q-pt-none">
          <div>
            Olá <span class="font-bold">{{ latestOrder.name }}</span
            >, seu pedido foi realizado com sucesso!
          </div>
          <div class="my-1 font-semibold">
            Items ({{ latestOrder.items.length }}):
          </div>
          <div
            v-for="cupcake in latestOrder.items"
            :key="cupcake.name"
            class="mb-2">
            {{ cupcake.name }} - R${{ cupcake.price }}
          </div>
          <div>Total: R${{ latestOrder.total }}</div>
          <div>Endereço: {{ latestOrder.address }}</div>
          <div>Telefone: {{ latestOrder.phone }}</div>
        </div>

        <div>
          <QBtn flat label="OK" color="primary" @click="popupConfirm = false" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<style scoped></style>
