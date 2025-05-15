# New E-Commerce Montink

## Descrição do Projeto

Este projeto é um front-end de e-commerce inspirado em grandes marketplaces (Amazon, Mercado Livre, Shopee), construído com React, TypeScript e Tailwind CSS. O design é moderno, responsivo (mobile-first) e acessível. A aplicação suporta tema claro e escuro, possui um carrinho em gaveta/sidebar, consulta de CEP via API ViaCEP e cálculo de data estimada de entrega.

### Funcionalidades principais

- **Layout responsivo** (mobile-first) e design intuitivo.
- **Tema claro e escuro** com persistência no `localStorage` (`themeAtom`).
- **Consulta de CEP e exibição de endereço** no carrinho (`CartDrawer`):
  - Validação de 8 dígitos.
  - Chamada à API ViaCEP (`src/services/viaCep.service.ts`).
  - CEP válido salvo em `localStorage` (`cepAtom`).
  - Exibição de logradouro, bairro, cidade e UF.
- **Cálculo de data estimada de entrega** (5 dias úteis):
  - Lógica em `src/atoms/addBusinessDays/addBusinessDaysAtom.ts`.
  - Exibe apenas se houver CEP válido e itens no carrinho.
- **Carrinho de compras lateral**:
  - Gaveta no mobile e sidebar fixa no desktop.
  - Adicionar, remover, atualizar quantidade e limpar carrinho.
  - Átomos Jotai: `cartItemsAtom`, `cartTotalAtom`, `cartItemCountAtom`, `cartDrawerOpenAtom`.
- **Produtos com placeholder de imagem** e carrossel de promoções:
  - Placeholder de imagem (35% da altura do card) e miniaturas.
  - Carrossel com auto-scroll (`PromotionalCarousel`).
- **Página de confirmação de pedido** (`OrderConfirmation`):
  - Resumo de itens, total pago, data estimada e endereço.
  - Botão “Continuar Comprando” limpa sessão e retorna ao catálogo.
- **Persistência de estado** usando Jotai com `localStorage` e `sessionStorage`.

## Tecnologias Utilizadas

- **React** (v18+)
- **TypeScript**
- **Tailwind CSS** (v3.x)
- **Jotai** (gerenciamento de estado)
- **Axios** (cliente HTTP)
- **Heroicons** (ícones SVG)
- **Jest** e **React Testing Library** (testes)

## Estrutura do Projeto

```
new-ecommerce-montink/
├── public/                 # Arquivos estáticos
├── src/
│   ├── atoms/              # Estados globais (Jotai)
│   ├── components/         # Componentes React
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── CartDrawer/
│   │   ├── PromotionalCarousel/
│   │   ├── ProductList/
│   │   ├── ProductCard/
│   │   ├── ProductDetail/
│   │   └── OrderConfirmation/
│   ├── Interface/          # Interfaces TypeScript
│   ├── services/           # Mock data e serviço ViaCEP
│   ├── App.tsx             # Componente principal e navegação de views
│   ├── index.tsx           # Ponto de entrada React
│   └── index.css           # Estilos globais Tailwind
├── tailwind.config.js      # Configuração Tailwind customizada
├── postcss.config.js       # Configuração PostCSS
├── tsconfig.json           # Configuração TypeScript
├── package.json
└── README.md               # Documentação do projeto
```

## Instruções de Instalação e Uso

1. Clone este repositório:
   ```bash
   git clone <REPO_URL>
   cd new-ecommerce-montink
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4. Abra `http://localhost:3000` no navegador.

## Testes

Execute os testes com:
```bash
npm test
```

## Deploy na Vercel (Opcional)

1. Conecte o repositório à Vercel.
2. Configure:
   - **Framework:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
3. Deploy.

## Contribuições

Contribuições são bem-vindas! Abra uma issue para propor melhorias ou correções.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
