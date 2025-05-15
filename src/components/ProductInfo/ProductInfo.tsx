import React from 'react';
import { Product } from '../../services/mockData';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="w-full md:w-3/5 flex flex-col p-4 md:pl-8">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-brand-off-white mb-2">
        {product.name}
      </h1>
      <p className="text-2xl md:text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">
        R$ {product.price.toFixed(2)}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">
        {product.description}
      </p>
      {/* Variant selectors will be added here later */}
    </div>
  );
};

export default ProductInfo;

