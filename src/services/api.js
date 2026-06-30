// Instância base do axios para todas as chamadas à API.
// Configurar VITE_API_URL no arquivo .env antes de usar:
//   VITE_API_URL=https://sua-api.com/api
//
// Endpoints esperados (a implementar no backend):
//   GET    /products          → lista todos os produtos
//   GET    /products/:id      → detalhe de um produto
//   POST   /orders            → cria um novo pedido
//   GET    /orders            → lista pedidos do usuário autenticado
//   GET    /orders/:id        → detalhe de um pedido
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api
