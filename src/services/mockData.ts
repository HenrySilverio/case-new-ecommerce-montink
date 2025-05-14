import { CartItem } from "../Interface/cart.interface";

export interface Product extends CartItem {
  id: string;
  name: string;
  description: string;
  category: string;
  promotional?: boolean;
  icon: string;
  price: number;
  quantity: number;
}

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Apple iPhone 15 Pro',
    price: 7999.9,
    quantity: 1,
    icon: '📱',
    description:
      'Apple iPhone 15 Pro com câmera tripla de 48MP, tela Super Retina XDR de 120Hz e chip A17 Pro. Desempenho excepcional para fotos, vídeos e jogos.',
    category: 'Eletrônicos',
    promotional: true,
  },
  {
    id: 'prod_002',
    name: 'Dell XPS 13 Plus',
    price: 9999.0,
    quantity: 1,
    icon: '💻',
    description:
      'Notebook Dell XPS 13 Plus, ultrafino, com processador Intel Core i7 de 12ª geração, 16GB RAM, SSD de 512GB e tela InfinityEdge Full HD.',
    category: 'Informática',
  },
  {
    id: 'prod_003',
    name: 'Sony WH-1000XM5',
    price: 1999.99,
    quantity: 1,
    icon: '🎧',
    description:
      'Fone de ouvido Sony WH-1000XM5 com cancelamento de ruído líder de mercado, áudio premium e bateria de até 30 horas.',
    category: 'Acessórios',
    promotional: true,
  },
  {
    id: 'prod_004',
    name: 'Samsung Galaxy Watch 6',
    price: 1899.0,
    quantity: 1,
    icon: '⌚',
    description:
      'Samsung Galaxy Watch 6 com monitoramento avançado de saúde, GPS integrado, resistência à água e design sofisticado.',
    category: 'Vestuário Inteligente',
  },
  {
    id: 'prod_005',
    name: 'GoPro HERO12 Black',
    price: 2999.5,
    quantity: 1,
    icon: '📷',
    description:
      'Câmera de ação GoPro HERO12 Black, gravação em 5.3K, estabilização HyperSmooth 6.0 e resistente à água até 10m.',
    category: 'Eletrônicos',
    promotional: true,
  },
  {
    id: 'prod_006',
    name: 'Samsung Galaxy Tab S9',
    price: 4999.0,
    quantity: 1,
    icon: '📝',
    description:
      'Tablet Samsung Galaxy Tab S9 com tela AMOLED de 11", processador Snapdragon 8 Gen 2, S Pen e bateria de longa duração.',
    category: 'Informática',
  },
  {
    id: 'prod_007',
    name: 'Kindle Paperwhite 11ª Geração',
    price: 649.0,
    quantity: 1,
    icon: '🖥️',
    description:
      'Kindle Paperwhite 11ª Geração, tela de 6.8", iluminação ajustável, resistente à água e bateria para semanas de leitura.',
    category: 'Informática',
  },
  {
    id: 'prod_008',
    name: 'Livro: Clean Code',
    price: 99.9,
    quantity: 1,
    icon: '📚',
    description:
      'Livro "Clean Code" de Robert C. Martin, referência essencial para boas práticas de programação e desenvolvimento de software limpo.',
    category: 'Livros',
  },
];

// Function to get a product by ID (useful for product detail page)
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

// Function to get promotional products
export const getPromotionalProducts = (): Product[] => {
  return mockProducts.filter((product) => product.promotional);
};
