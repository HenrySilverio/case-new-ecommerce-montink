import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { XMarkIcon, PlusIcon, MinusIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import { estimatedDeliveryDateAtom } from '../../atoms/addBusinessDays/addBusinessDaysAtom';
import { cartDrawerOpenAtom, cartItemsAtom, cartTotalAtom, cartItemCountAtom } from '../../atoms/Cart/cartAtoms';
import { cepAtom } from '../../atoms/Cep/cepAtoms';


const CartDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(cartDrawerOpenAtom);
  const [items, setItems] = useAtom(cartItemsAtom);
  const [total] = useAtom(cartTotalAtom);
  const [itemCount] = useAtom(cartItemCountAtom);
  const [deliveryDate] = useAtom(estimatedDeliveryDateAtom);
  const [currentCep] = useAtom(cepAtom);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        setIsOpen(true); // Keep cart open on desktop by default
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setItems(items.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  const cartContent = (
    <div className="h-full flex flex-col text-gray-800 dark:text-brand-off-white"> {/* BG and rounding moved to parent */}
      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-400 dark:bg-zinc-900"> {/* Reduced padding, added darker background */}
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Seu Carrinho ({itemCount})</h2>
        {!isDesktop && (
          <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700">
            <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center p-4">
          <p className="text-gray-500 dark:text-gray-400">Seu carrinho está vazio.</p>
          {!currentCep && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Adicione seu CEP para ver estimativas de entrega.</p>}
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 p-2 bg-white dark:bg-zinc-800 rounded shadow">
              <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center rounded">
                <span className="text-xl">{item.icon || '🛍️'}</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-brand-blue dark:text-dark-brand-blue">{item.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Preço: R$ {item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700">
                    <MinusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <span className="text-sm font-medium text-gray-800 dark:text-brand-off-white">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700">
                    <PlusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="p-4 border-t border-gray-300 dark:border-gray-600 space-y-3">
          <div className="flex justify-between font-semibold text-brand-blue dark:text-dark-brand-blue">
            <span>Subtotal:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          
          {deliveryDate && (
            <div className="text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/20 p-2 rounded flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Entrega estimada: <strong>{deliveryDate}</strong></span>
            </div>
          )}
          {!deliveryDate && currentCep && items.length > 0 && (
             <div className="text-sm text-gray-600 dark:text-gray-400 p-2 rounded">
                <span>Calculando estimativa de entrega...</span>
            </div>
          )}
          {!currentCep && items.length > 0 && (
            <div className="text-sm text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-500/20 p-2 rounded">
              <span>Informe seu CEP no cabeçalho para estimar a entrega.</span>
            </div>
          )}

          <button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded shadow-md transition duration-150"
            onClick={() => alert('Funcionalidade "Finalizar Compra" a ser implementada!')}
          >
            Finalizar Compra
          </button>
          <button 
            onClick={handleClearCart}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-gray-200 py-2 rounded shadow-sm transition duration-150 text-sm"
          >
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <aside className="w-96 max-h-[calc(100vh-4rem)] sticky top-8 overflow-y-auto bg-brand-cart-bg dark:bg-dark-brand-cart-bg shadow-lg ml-4 hidden md:block rounded-lg">
        {cartContent}
      </aside>
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="fixed top-4 right-4 bottom-4 w-full max-w-md bg-brand-cart-bg dark:bg-dark-brand-cart-bg shadow-xl flex flex-col rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {cartContent}
      </div>
    </div>
  );
};

export default CartDrawer;

