import { ref, computed } from 'vue'
// TODO: importar `api` de '@/services/api' quando o backend estiver pronto

// TODO: remover STORAGE_KEY e todas as funções de localStorage
// quando os pedidos passarem a ser persistidos no banco via API
const STORAGE_KEY = 'cupcake_orders'

export function useOrders() {
  // TODO: substituir por GET /orders (com autenticação do usuário)
  // Exemplo:
  //   const orders = ref([])
  //   onMounted(async () => {
  //     const { data } = await api.get('/orders')
  //     orders.value = data
  //   })
  const orders = ref(loadOrdersFromStorage())

  // TODO: remover — substituída por GET /orders
  function loadOrdersFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  // TODO: remover — substituída por POST /orders (ver createOrder abaixo)
  function saveOrdersToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.value))
  }

  // TODO: substituir o corpo desta função por POST /orders
  // Exemplo:
  //   const { data } = await api.post('/orders', { customerData, items })
  //   orders.value.push(data)
  //   return data
  // O id e o timestamp devem vir do backend, não serem gerados no front.
  function createOrder(customerData, items) {
    const order = {
      id: orders.value.length + 1,
      timestamp: new Date().toISOString(),
      formattedDate: formatDate(new Date()),
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      total: calculateTotal(items),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        quantity: item.quantity,
        price: item.price,
      })),
    }
    orders.value.push(order)
    saveOrdersToStorage() // TODO: remover após integração com API
    return order
  }

  function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${day}/${month}/${year} ${hours}h${minutes}`
  }

  function getOrderById(id) {
    return orders.value.find(order => order.id === id)
  }

  const totalOrders = computed(() => orders.value.length)

  const totalRevenue = computed(() => {
    return orders.value.reduce((sum, order) => sum + order.total, 0)
  })

  return {
    orders,
    createOrder,
    getOrderById,
    totalOrders,
    totalRevenue,
  }
}
