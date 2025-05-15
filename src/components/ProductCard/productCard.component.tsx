import React from 'react';
import { useSetAtom } from 'jotai';
import { EyeIcon } from '@heroicons/react/24/outline';
import { currentViewAtom, currentProductIdAtom } from '../../atoms/Cart/cartAtoms';
import { Product } from '../../services/mockData';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const setCurrentView = useSetAtom(currentViewAtom);
  const setCurrentProductId = useSetAtom(currentProductIdAtom);

  const handleViewDetails = () => {
    setCurrentProductId(product.id);
    setCurrentView('productDetail');
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      <button 
        onClick={handleViewDetails} 
        className="block w-full h-48 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-6xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-orange-400"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        {product.icon || '📦'}
      </button>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-brand-blue dark:text-brand-off-white mb-1 truncate" title={product.name}>{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden flex-grow">
          {product.description.substring(0, 55)}{product.description.length > 55 ? '...' : ''}
        </p>
        <div className="flex items-center justify-between mb-3 mt-auto">
          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">R$ {product.price.toFixed(2)}</p>
          {/* Placeholder for rating or other info */}
        </div>
        <button 
          onClick={handleViewDetails}
          className="w-full bg-brand-blue hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center transition duration-150 ease-in-out"
        >
          <EyeIcon className="h-5 w-5 mr-2" />
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

