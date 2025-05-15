import React from 'react';
import { ProductVariant } from '../../services/mockData';

interface VariantSelectorsProps {
  variants: ProductVariant | undefined;
  selectedSize: string | undefined;
  setSelectedSize: (size: string) => void;
  selectedColor: string | undefined;
  setSelectedColor: (color: string) => void;
}

const VariantSelectors: React.FC<VariantSelectorsProps> = ({
  variants,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) => {
  if (!variants || ( (!variants.size || variants.size.length === 0) && (!variants.color || variants.color.length === 0) )) {
    return null; // Don't render if no variants are available
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Size Selector */}
      {variants.size && variants.size.length > 0 && (
        <div>
          <label 
            htmlFor="size-selector" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Tamanho:
          </label>
          <select
            id="size-selector"
            value={selectedSize || ''}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-blue dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:focus:ring-orange-400"
          >
            {!selectedSize && <option value="" disabled>Selecione o tamanho</option>}
            {variants.size.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Color Selector */}
      {variants.color && variants.color.length > 0 && (
        <div>
          <label 
            htmlFor="color-selector" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Cor:
          </label>
          <select
            id="color-selector"
            value={selectedColor || ''}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-blue dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:focus:ring-orange-400"
          >
            {!selectedColor && <option value="" disabled>Selecione a cor</option>}
            {variants.color.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default VariantSelectors;

