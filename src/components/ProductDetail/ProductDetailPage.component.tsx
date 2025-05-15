import React, { useState, useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { cartItemsAtom, currentProductIdAtom, currentViewAtom } from '../../atoms/Cart/cartAtoms';
import { CartItem } from '../../Interface/cart.interface';
import { Product, getProductById } from '../../services/mockData';
import ProductIconGallery from '../ProductIconGallery/ProductIconGallery.component';
import ProductInfo from '../ProductInfo/ProductInfo';
import VariantSelectors from '../VariantSelectors/VariantSelectors';

const ProductDetailPage: React.FC = () => {
  const productId = useAtomValue(currentProductIdAtom);
  const setCurrentView = useSetAtom(currentViewAtom);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);

  useEffect(() => {
    if (productId) {
      const fetchedProduct = getProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        if (fetchedProduct.variants?.size && fetchedProduct.variants.size.length > 0) {
          setSelectedSize(fetchedProduct.variants.size[0]);
        }
        if (fetchedProduct.variants?.color && fetchedProduct.variants.color.length > 0) {
          setSelectedColor(fetchedProduct.variants.color[0]);
        }
      }
    } else {
      setProduct(null);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd: CartItem = {
        ...product,
        quantity: 1,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      };

      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => 
            item.id === product.id && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          return updatedItems;
        } else {
          return [...prevItems, itemToAdd];
        }
      });
    }
  };

  if (!product) {
    return (
      <div className="p-4 md:p-8 text-center">
        <p className="text-xl text-gray-700 dark:text-gray-300">Produto não encontrado.</p>
        <button 
          onClick={() => setCurrentView('productList')}
          className="mt-4 bg-brand-blue hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center mx-auto transition duration-150 ease-in-out"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Voltar para Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-off-white dark:bg-gray-900 p-4 md:p-8">
      <button 
        onClick={() => setCurrentView('productList')}
        className="mb-6 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out text-sm"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Voltar para Produtos
      </button>
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-800 shadow-xl rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <ProductIconGallery icons={product.icons} productName={product.name} />
          <div className="w-full md:w-3/5 flex flex-col">
            <ProductInfo product={product} />
            <VariantSelectors 
              variants={product.variants}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <button 
              onClick={handleAddToCart}
              className="mt-8 w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center justify-center text-lg"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

