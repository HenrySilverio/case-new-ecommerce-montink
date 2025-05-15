import React from 'react';
import { mockProducts } from '../../services/mockData';
import ProductCard from '../ProductCard/productCard.component';

const ProductList: React.FC = () => {
  // For now, using all mockProducts. Later, this could be paginated, filtered, etc.
  const productsToDisplay = mockProducts;

  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-brand-blue dark:text-brand-off-white mb-6 text-center">
        Nossos Produtos
      </h2>
      {productsToDisplay.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsToDisplay.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;

