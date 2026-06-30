import { ref, computed } from 'vue'

const STORAGE_KEY = 'cupcake_orders'

export function useOrders() {
  const orders = ref(loadOrdersFromStorage())

  function loadOrdersFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  function saveOrdersToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.value))
  }

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
    saveOrdersToStorage()
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
