import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Product } from '../../Interface/products.interface';
import { cartItemsAtom } from '../../atoms/Cart/cartAtoms';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const setCartItems = useSetAtom(cartItemsAtom);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variants?.sizes?.[0],
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variants?.colors?.[0],
  );

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
    };
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id ===
          productToAdd.id
      ); 
      if (existingItem) {
        return prevItems.map((item) =>
          item.id ===
          productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Main Icon Display */}
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-6xl">{product.icon || '📦'}</span>
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold text-brand-blue dark:text-brand-off-white mb-1 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">
          R$ {product.price.toFixed(2)}
        </p>

        {/* Variant Selectors */}
        {product.variants?.sizes && product.variants.sizes.length > 0 && (
          <div className="mb-3">
            <label
              htmlFor={`size-${product.id}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tamanho:
            </label>
            <select
              id={`size-${product.id}`}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {product.variants.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {product.variants?.colors && product.variants.colors.length > 0 && (
          <div className="mb-3">
            <label
              htmlFor={`color-${product.id}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Cor:
            </label>
            <select
              id={`color-${product.id}`}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {product.variants.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden">
          {product.description.substring(0, 60)}
          {product.description.length > 60 ? '...' : ''}
        </p>

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
