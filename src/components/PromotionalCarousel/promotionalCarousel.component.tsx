import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getPromotionalProducts, Product } from '../../services/mockData';
import ProductCard from '../ProductCard/productCard.component';

const PromotionalCarousel: React.FC = () => {
  const [promotionalProducts, setPromotionalProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setPromotionalProducts(getPromotionalProducts());
  }, []);

  const productsToShow = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, promotionalProducts.length - productsToShow) : Math.max(0, prevIndex - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= promotionalProducts.length - productsToShow ? 0 : Math.min(promotionalProducts.length - productsToShow, prevIndex + 1)
    );
  };

  if (promotionalProducts.length === 0) {
    return null;
  }

  const visibleProducts = promotionalProducts.slice(currentIndex, currentIndex + productsToShow);


  return (
    <section className="py-8 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl md:text-3xl font-semibold text-brand-blue dark:text-brand-off-white mb-6 text-center">
        Ofertas Especiais
      </h2>
      {promotionalProducts.length < productsToShow && promotionalProducts.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${promotionalProducts.length} gap-6 px-4`}>
          {promotionalProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : promotionalProducts.length >= productsToShow ? (
        <div className="relative px-4">
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${productsToShow} gap-6`}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {promotionalProducts.length > productsToShow && (
            <>
              <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed z-10 ml-[-10px] md:ml-[-20px]"
                aria-label="Anterior"
              >
                <ChevronLeftIcon className="h-6 w-6 text-brand-blue dark:text-brand-off-white" />
              </button>
              <button 
                onClick={handleNext} 
                disabled={currentIndex >= promotionalProducts.length - productsToShow}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed z-10 mr-[-10px] md:mr-[-20px]"
                aria-label="Próximo"
              >
                <ChevronRightIcon className="h-6 w-6 text-brand-blue dark:text-brand-off-white" />
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Nenhuma oferta especial no momento.</p>
      )}
    </section>
  );
};

export default PromotionalCarousel;

