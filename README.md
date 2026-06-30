# 🧁 Cupcake Store

<div align="left">
<a href="https://cupcack-store.netlify.app/#/"><img height="355em" alt="Cupcake Store" src="https://github.com/isabellacpmelo/cupcake-store/blob/main/public/cupcake_store.png?raw=true" /></a>
</div>
</br>
<a href="https://cupcack-store.netlify.app/#/">Clique aqui para acessar o projeto</a>

## Sobre o projeto

Cupcake Store é uma elegante loja virtual fictícia de cupcakes construída com **Vue.js 3** e **Vite**, apresentando um catálogo de produtos com carrinho de compras funcional, histórico de pedidos persistente e uma experiência de usuário premium com animações suaves e design moderno.

### Funcionalidades

**Página Inicial (Hero Section)**
- Animação de entrada progressiva com efeito de digitação
- Cupcake animado com efeito de flutuação contínuo
- Botão inteligente para acessar o catálogo
- Navegação smooth para visualizar Produtos, Pedidos e Sobre
- Design responsivo com gradiente moderno
- Transições elegantes entre seções

**Catálogo de Produtos**
- Grade responsiva de produtos com cards interativos
- Cada produto exibe: nome, preço, descrição e emoji
- Botões de adicionar/remover do carrinho
- Indicação visual da quantidade de items no carrinho
- Animações hover suave em cards de produtos
- Busca e filtros preparados para integração com API

**Carrinho de Compras**
- Popup flutuante que abre/minimiza com um clique
- Exibe total de items e preço total em tempo real
- Controles para aumentar/diminuir quantidade de items
- Remoção individual de produtos
- Botão para limpar carrinho completamente
- Validação de formulário com mensagens de erro em tempo real

**Formulário de Checkout**
- Campos: Nome, Endereço e Telefone com máscara automática `(##) #####-####`
- Validação integrada com feedback visual
- Botão de checkout desabilitado até preenchimento correto
- Modal de confirmação elegante após pedido bem-sucedido
- Limpeza automática do formulário e carrinho após confirmação

**Histórico de Pedidos**
- Listagem completa de todos os pedidos realizados
- Exibição de data/hora automática de cada pedido
- Cards com informações do cliente: nome, endereço, telefone
- Breakdown detalhado de items pedidos (nome, quantidade, preço unitário)
- Total do pedido destacado
- Status visual com ícone de confirmação
- Empty state elegante quando não há pedidos
- Dados persistidos no localStorage

**Seção Sobre Nós**
- Layout com imagem + conteúdo lado a lado
- Seção de valores da marca com cards animados
- Hover effects suaves
- Responsivo em todas as resoluções
- Design profissional e atrativo

**Experiência Geral**
- Tema visual moderno com paleta rosa/laranja/roxo
- Tipografia elegante (Poppins para títulos, Raleway para corpo)
- Ícones Bootstrap Icons para melhor UX
- Transições suaves entre vistas e componentes
- Acessibilidade melhorada com aria-labels
- Responsividade completa (mobile, tablet, desktop)

### Tecnologias

- [Vue.js 3](https://vuejs.org/) — Framework JavaScript reativo
- [Vite 4](https://vitejs.dev/) — Build tool moderno e rápido
- [UnoCSS 0.54](https://unocss.dev/) — Engine de CSS-in-JS
- [Axios 1.8](https://axios-http.com/) — Cliente HTTP para requisições
- [Vue Router 4](https://router.vuejs.org/) — Roteamento SPA
- [VueUse 10](https://vueuse.org/) — Composables utilities
- [Sass](https://sass-lang.com/) — Pré-processador CSS
- [Bootstrap Icons](https://icons.getbootstrap.com/) — Ícones SVG

### IDE Recomendada

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desabilite o Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Screenshots

### Página Principal
Seção hero com animação progressiva e cupcake flutuante, botão para acessar o catálogo.
> `https://github.com/isabellacpmelo/cupcake-store/blob/main/public/cupcake_store.png?raw=true`

### Catálogo de Produtos
Grid de produtos com cards interativos, carrinho flutuante, formulário de checkout e modal de confirmação.

### Histórico de Pedidos
Cards de pedidos com todas as informações, data/hora, items solicitados e status.

### Seção Sobre
Conteúdo da marca com cards de valores e design responsivo.

## Arquitetura

### Fluxo de Dados

```
┌──────────────┐   seleção de     ┌────────────────────┐   persistência   ┌────────────┐
│  ProductCard │ produtos/carrinho │  useCart (state)   │ ──────────────► │ localStorage│
│   + Popup    │ ────────────────► │  (composable)       │                 │ (Orders)   │
└──────────────┘                   └────────────────────┘                 └────────────┘
       │                                      │
       │                                      ▼
       │                            ┌────────────────────┐
       └───────────────────────────►│  useProducts       │
                                    │  (lista hardcoded) │
                                    └────────────────────┘

┌──────────────────┐   validação   ┌──────────────────┐   persiste   ┌────────────┐
│ CartPopup        │ + checkout    │  useOrders       │ ──────────► │ localStorage│
│ (formulário)     │ ──────────────►│  (composable)     │             │ (Orders)   │
└──────────────────┘               └──────────────────┘             └────────────┘
```

### Política de Cache & Persistência

| Gatilho              | Comportamento                                  |
|---------------------|------------------------------------------------|
| Carga da página     | Restaura pedidos salvos no localStorage        |
| Adicionar ao carrinho | State reativo atualizado em tempo real       |
| Checkout            | Cria novo pedido e salva no localStorage       |
| Recarregar página   | Pedidos restaurados automaticamente            |

### Componentes & Organização

```
src/
├── assets/
│   ├── images/              # Ícones e imagens do app
│   ├── style.css            # Estilos globais e tokens de tema
│   └── views/
│       ├── About.vue        # Seção sobre a marca
│       ├── Products.vue     # Catálogo e carrinho
│       └── Orders.vue       # Histórico de pedidos
├── components/
│   ├── Btn.vue              # Botão com 5 variantes
│   ├── Input.vue            # Campo com validação
│   ├── Modal.vue            # Modal reutilizável com Teleport
│   ├── Menu.vue             # Menu de navegação
│   ├── TabMenu.vue          # Menu em abas
│   ├── CatalogHeader.vue    # Header do catálogo
│   ├── CatalogContentShell.vue # Shell do conteúdo
│   ├── HeroIntro.vue        # Seção hero principal
│   └── products/
│       ├── ProductCard.vue           # Card individual de produto
│       ├── CartPopup.vue             # Popup do carrinho
│       ├── FloatingCartButton.vue    # Botão flutuante
│       └── OrderConfirmationModal.vue # Modal de confirmação
├── composables/
│   ├── useCart.js                    # Gerencia estado do carrinho
│   ├── useProducts.js                # Lista e dados de produtos
│   ├── useOrders.js                  # Persistência de pedidos (localStorage)
│   ├── useHeroIntroAnimation.js      # Animação da seção hero
│   └── utils.js                      # Funções utilitárias
├── services/
│   └── api.js                        # Cliente Axios preparado para backend
├── layouts/
│   └── default.vue                   # Layout padrão da aplicação
├── pages/
│   ├── index.vue                     # Página principal
│   └── index_backup.vue              # Backup
├── App.vue                           # Componente raiz
├── main.js                           # Ponto de entrada
└── router.js                         # Configuração de rotas
```

## Principais Decisões de Design

### 1. **Separação de Responsabilidades com Composables**
Os composables (`useCart`, `useProducts`, `useOrders`) encapsulam toda a lógica de negócio, deixando os componentes Vue apenas com apresentação. Isso facilita testes, reutilização e manutenção.

### 2. **Dados Hardcoded com TODO para API**
Atualmente, produtos e pedidos usam dados mockados (localStorage para pedidos). Cada arquivo tem comentários `TODO` indicando onde integrar a API real, facilitando futura transição para backend.

### 3. **Persistência com localStorage**
Pedidos são salvos no browser, permitindo que o histórico persista mesmo após recarregar. Isso oferece feedback imediato e experiência offline-friendly.

### 4. **Componentes Customizados**
`Btn.vue`, `Input.vue` e `Modal.vue` foram criados customizados para:
- Garantir consistência visual
- Evitar dependências (Quasar removido)
- Facilitar personalização futura
- Melhor performance

### 5. **Animações Progressivas**
O Hero Section usa um coreografia de animações:
- Cupcake entra com scale/pop (0.6s)
- Título digitado após 0.3s
- Botão aparece após 0.8s
- Cupcake flutua continuamente
Tudo sincronizado via `useHeroIntroAnimation` para efeito cinematográfico.

### 6. **Validação Integrada**
O `Input.vue` customizado valida em tempo real com mensagens de erro inline, enquanto o formulário no CartPopup não permite checkout sem preenchimento correto.

### 7. **Máscara de Telefone**
Input de telefone formata automaticamente para `(##) #####-####`, oferecendo melhor UX sem bibliotecas externas.

### 8. **Responsividade Mobile-First**
Layouts usam breakpoints definidos em `style.css` para adaptar desde mobile (< 768px) até desktop (1024px+).

### 9. **Ícones Bootstrap Icons**
Integrados via `@iconify-json/carbon` e `@unocss/preset-icons`, oferecendo ícones escaláveis e sem overhead.

### 10. **Rotas Geradas Automaticamente**
Via `vite-plugin-pages` e `vite-plugin-vue-layouts`, as rotas são descobertas automaticamente dos arquivos em `src/pages/`, reduzindo boilerplate.

## Como executar

### Pré-requisitos

- Node.js >= 18
- pnpm >= 8 (ou npm/yarn alternativamente)

### Instalação

```bash
cd cupcake-store
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5174` (ou outra porta se 5174 estiver ocupada).

Durante desenvolvimento, você terá:
- Hot Module Replacement (HMR) automático
- Refresh instantâneo ao salvar arquivos
- Console com avisos de linting

### Build de produção

```bash
pnpm build
```

Gera arquivos otimizados em `dist/`. Para testar localmente:

```bash
pnpm preview
```

### Linting e Correções

```bash
pnpm lint
```

Verifica erros de linting com ESLint.

```bash
pnpm lint:fix
```

Corrige automaticamente os erros encontrados.

## Variáveis de Ambiente

Atualmente o projeto não requer variáveis de ambiente. Quando integrado com backend, adicione um arquivo `.env` na raiz:

```env
VITE_API_URL=https://sua-api.com/api
```

Esta URL será usada pelo cliente Axios em `src/services/api.js` para fazer requisições ao backend.

## Deploy Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/c25fd948-9898-4f42-9f47-b1d11f1873b4/deploy-status)](https://app.netlify.com/sites/cupcack-store/deploys)

**Versão ao vivo:** [cupcack-store.netlify.app](https://cupcack-store.netlify.app/)

## Próximas Melhorias

- **Backend Integration:** Conectar com API real para produtos e pedidos
- **Autenticação:** Sistema de login/registro para histórico pessoal de pedidos
- **Imagens Reais:** Sistema de upload para produtos com imagens em vez de emojis
- **Dark Mode:** Toggle entre temas claro/escuro com preferência salva
- **Notificações:** Toast/snackbars para feedback de ações (adicionado ao carrinho, etc.)
- **PWA:** Transformar em aplicação web progressiva com offline support
- **Admin Panel:** Dashboard para gerenciamento de produtos
- **Busca Avançada:** Filtros por preço, categoria, avaliação
- **Avaliações:** Sistema de reviews de produtos
- **Recomendações:** Produtos relacionados e sugestões personalizadas
- **Testes:** Testes unitários (Vitest) e E2E (Cypress)

## Stack Resumido

```json
{
  "vue": "3.5.13",
  "vite": "4.5.11",
  "unocss": "0.54.3",
  "axios": "1.8.4",
  "vue-router": "4.5.0",
  "@vueuse/core": "10.11.1",
  "sass": "1.33.0"
}
```

## Contribuindo

Este é um projeto fictício para fins educacionais e demonstração. Sinta-se livre para explorar o código, aprender a estrutura e adaptar para seus próprios projetos!

## Licença

[Ver LICENSE](./LICENSE)


