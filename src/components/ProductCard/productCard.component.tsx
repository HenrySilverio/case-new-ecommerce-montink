import React from 'react';
import { useSetAtom } from 'jotai';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Product } from '../../Interface/products.interface';
import { cartItemsAtom } from '../../atoms/Cart/cartAtoms';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const setCartItems = useSetAtom(cartItemsAtom);

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">
        {product.icon || '📦'}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-brand-blue dark:text-brand-off-white mb-1 truncate" title={product.name}>{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden">
          {product.description.substring(0, 60)}{product.description.length > 60 ? '...' : ''}
        </p>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">R$ {product.price.toFixed(2)}</p>
          {/* Placeholder for rating or other info */}
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center transition duration-150 ease-in-out"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

