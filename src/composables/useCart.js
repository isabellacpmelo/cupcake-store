import { ref, computed } from 'vue'

export function useCart() {
  const items = ref([])

  const addItem = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    }
    else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        quantity: 1,
      })
    }
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value[index].quantity--
      if (items.value[index].quantity === 0) {
        items.value.splice(index, 1)
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const itemsSummary = computed(() => {
    return items.value.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      emoji: item.emoji,
    }))
  })

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    itemsSummary,
  }
}
