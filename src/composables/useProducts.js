import { ref, computed } from 'vue'
// TODO: importar `api` de '@/services/api' quando o backend estiver pronto

export function useProducts() {
  // TODO: substituir este array por uma chamada GET /products
  // Exemplo:
  //   const products = ref([])
  //   onMounted(async () => {
  //     const { data } = await api.get('/products')
  //     products.value = data
  //   })
  // Campos esperados da API: { id, name, price, description, imageUrl }
  // O campo `emoji` pode ser removido quando houver imagem real.
  const products = ref([
    {
      id: 1,
      name: 'Chocolate',
      price: 10.0,
      emoji: '🍫',
      description: 'Cupcake de chocolate com cobertura de chocolate belga',
    },
    {
      id: 2,
      name: 'Morango',
      price: 10.0,
      emoji: '🍓',
      description: 'Cupcake de morango fresco com cobertura rosada',
    },
    {
      id: 3,
      name: 'Laranja',
      price: 8.0,
      emoji: '🍊',
      description: 'Cupcake cítrico com toque de laranja confitada',
    },
    {
      id: 4,
      name: 'Nutella',
      price: 13.0,
      emoji: '🟤',
      description: 'Cupcake recheado com a melhor Nutella',
    },
    {
      id: 5,
      name: 'Ovomalte',
      price: 13.0,
      emoji: '✨',
      description: 'Cupcake com sabor único de Ovomalte maltado',
    },
  ])

  // TODO: substituir por GET /products/:id quando vier do banco
  const getProductById = (id) => products.value.find(p => p.id === id)

  return {
    products,
    getProductById,
  }
}
