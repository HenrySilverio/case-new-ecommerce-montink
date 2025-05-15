
export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  icon: string;
  icons: string[];
}

export interface ProductVariant {
  size?: string[];
  color?: string[];
}

export interface Product extends BaseProduct {
  description: string;
  category: string;
  promotional?: boolean; 
  variants?: ProductVariant;
}

export const mockProducts: Product[] = [
  {
    id: "prod_001",
    name: "Smartphone X Pro",
    price: 2999.90,
    quantity: 1,
    icon: "📱",
    icons: ["📱", "📲", "🤳"],
    description: "O mais recente Smartphone X Pro com câmera de 108MP, tela AMOLED de 120Hz e processador Snapdragon de última geração. Perfeito para jogos e fotografia.",
    category: "Eletrônicos",
    promotional: true,
    variants: {
      size: ["128GB", "256GB", "512GB"],
      color: ["Preto", "Branco", "Azul"],
    },
  },
  {
    id: "prod_002",
    name: "Notebook UltraSlim Y",
    price: 4599.00,
    quantity: 1,
    icon: "💻",
    icons: ["💻", "⌨️", "🖱️"],
    description: "Notebook UltraSlim Y, leve, potente e com bateria de longa duração. Ideal para trabalho e estudos, com tela de 14 polegadas Full HD.",
    category: "Informática",
    variants: {
      size: ["8GB RAM", "16GB RAM"],
      color: ["Prata", "Cinza Espacial"],
    },
  },
  {
    id: "prod_003",
    name: "Fone de Ouvido Z Bass",
    price: 349.99,
    quantity: 1,
    icon: "🎧",
    icons: ["🎧", "🎶", "🎤"],
    description: "Fone de Ouvido Z Bass com cancelamento de ruído ativo, som imersivo de alta fidelidade e design confortável para longas horas de uso.",
    category: "Acessórios",
    promotional: true,
    variants: {
      color: ["Preto", "Branco", "Vermelho"],
    },
  },
  {
    id: "prod_004",
    name: "Smartwatch Fit Plus",
    price: 899.00,
    quantity: 1,
    icon: "⌚",
    icons: ["⌚", "🏃", "💓"],
    description: "Smartwatch Fit Plus com monitoramento de saúde completo, GPS integrado, mais de 50 modos de esporte e design elegante.",
    category: "Vestuário Inteligente",
    variants: {
      size: ["Pequeno", "Grande"],
      color: ["Preto", "Rosa"],
    },
  },
  {
    id: "prod_005",
    name: "Câmera ProShot 4K",
    price: 1799.50,
    quantity: 1,
    icon: "📷",
    icons: ["📷", "🏞️", "🎬"],
    description: "Câmera de Ação ProShot 4K, à prova d\'água, com estabilização avançada e gravação em ultra alta definição. Capture todos os seus momentos.",
    category: "Eletrônicos",
    promotional: true,
  },
  {
    id: "prod_006",
    name: "Tablet EduTab 10",
    price: 1250.00,
    quantity: 1,
    icon: "📝", 
    icons: ["📝", "📖", "🎨"],
    description: "Tablet EduTab 10 com tela de 10 polegadas, ideal para estudos e entretenimento, com controle parental e conteúdo educativo.",
    category: "Informática",
    variants: {
      color: ["Azul", "Rosa", "Verde"],
    },
  },
  {
    id: "prod_007",
    name: "Console Gamer NextGen",
    price: 3999.00,
    quantity: 1,
    icon: "🎮",
    icons: ["🎮", "🕹️", "🏆"],
    description: "Console Gamer NextGen com gráficos de última geração, SSD ultrarrápido e uma vasta biblioteca de jogos exclusivos. A melhor experiência gamer.",
    category: "Games",
  },
  {
    id: "prod_008",
    name: "Livro: A Jornada do Código",
    price: 49.90,
    quantity: 1,
    icon: "📚",
    icons: ["📚", "👨‍💻", "💡"],
    description: "Best-seller \"A Jornada do Código\", uma aventura épica pelo mundo da programação, ideal para iniciantes e experientes.",
    category: "Livros",
  },
];

// Function to get a product by ID (useful for product detail page)
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product: Product) => product.id === id);
};

// Function to get promotional products
export const getPromotionalProducts = (): Product[] => {
  return mockProducts.filter((product: Product) => product.promotional);
};

