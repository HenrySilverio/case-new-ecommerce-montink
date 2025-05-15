import React, { useEffect, useState, useCallback } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { estimatedDeliveryDateAtom } from '../../atoms/addBusinessDays/addBusinessDaysAtom';
import {
  cartDrawerOpenAtom,
  cartItemsAtom,
  cartTotalAtom,
  cartItemCountAtom,
  currentViewAtom,
} from '../../atoms/Cart/cartAtoms';
import { cepAtom, addressAtom, cepErrorAtom } from '../../atoms/Cep/cepAtoms';
import { fetchAddressByCep } from '../../services/viaCep.service';
import { ViaCepResponse } from '../../Interface/viaCep.interface'; // Assuming this interface exists
import { RESET } from 'jotai/utils';
import { CompletedOrder } from '../../Interface/orderConfirmation.interface';
import { completedOrderAtom } from '../../atoms/OrderConfirmation/orderConfirmationAtoms';

const CartDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(cartDrawerOpenAtom);
  const [items, setItems] = useAtom(cartItemsAtom);
  const [total] = useAtom(cartTotalAtom);
  const [itemCount] = useAtom(cartItemCountAtom);
  const [deliveryDate] = useAtom(estimatedDeliveryDateAtom);

  const [persistedCep, setPersistedCep] = useAtom(cepAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [cepLookupError, setCepLookupError] = useAtom(cepErrorAtom);
  const currentAddress = useAtomValue(addressAtom);

  const [localCepInput, setLocalCepInput] = useState(persistedCep || '');
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const setCurrentView = useSetAtom(currentViewAtom);
  const setCompletedOrder = useSetAtom(completedOrderAtom);

  const handleCepLookup = useCallback(
    async (cepToLookup: string) => {
      if (cepToLookup.length !== 8) {
        setCepLookupError('CEP deve conter 8 dígitos.');
        setAddress(null);
        return;
      }
      setIsLoadingCep(true);
      setCepLookupError(null);

      try {
        const fetchedAddress: ViaCepResponse | null = await fetchAddressByCep(
          cepToLookup,
        );
        if (fetchedAddress && !fetchedAddress.erro) {
          setAddress(fetchedAddress);
          setPersistedCep(fetchedAddress.cep.replace(/\D/g, ''));
          setCepLookupError(null);
        } else {
          setAddress(null);
          setPersistedCep(null);
          setCepLookupError(
            fetchedAddress?.erro
              ? 'CEP não encontrado.'
              : 'Erro ao buscar CEP. Tente novamente.',
          );
        }
      } catch (error) {
        setAddress(null);
        setPersistedCep(null);
        setCepLookupError('Erro ao conectar ao serviço de CEP.');
        console.error('CEP lookup error:', error);
      } finally {
        setIsLoadingCep(false);
      }
    },
    [setAddress, setCepLookupError, setPersistedCep],
  );

  useEffect(() => {
    setLocalCepInput(persistedCep || '');
    if (persistedCep && !address && persistedCep.length === 8) {
      handleCepLookup(persistedCep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedCep]);

  const handleCepInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, '');
    setLocalCepInput(numericValue.slice(0, 8));
  };

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
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
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  const handleFinalizarCompra = () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    if (!persistedCep || !currentAddress) {
      alert('Por favor, informe um CEP válido para entrega.');
      // Optionally, focus the CEP input or highlight it
      return;
    }

    const orderToComplete: CompletedOrder = {
      items: items,
      total: total,
      deliveryDate: deliveryDate,
      address: currentAddress, // currentAddress is the ViaCepResponse object
      orderTimestamp: Date.now(),
    };

    setCompletedOrder(orderToComplete);
    setCurrentView('orderConfirmation');
    setItems(RESET); // Clear the cart after placing the order
    if (!isDesktop) {
      setIsOpen(false); // Close mobile drawer
    }
  };

  const cartContent = (
    <div className="h-full max-h-[62.5rem] flex flex-col text-gray-800 dark:text-brand-off-white overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-400 dark:bg-zinc-900 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Seu Carrinho ({itemCount})
        </h2>
        {!isDesktop && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>

      {/* CEP Lookup Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <label
          htmlFor="cepInputCart"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Consultar Frete e Entrega:
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="cepInputCart"
            placeholder="Digite seu CEP"
            value={localCepInput}
            onChange={handleCepInputChange}
            maxLength={8}
            className="flex-grow px-3 py-2 rounded-l border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-zinc-700 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue dark:focus:ring-orange-400 focus:border-brand-blue dark:focus:border-orange-400 h-[40px]"
          />
          <button
            onClick={() => handleCepLookup(localCepInput)}
            disabled={isLoadingCep || localCepInput.length !== 8}
            className="bg-brand-blue hover:bg-opacity-90 text-white px-3 py-2 rounded-r text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12 h-[40px] dark:bg-dark-brand-blue dark:hover:bg-opacity-80"
          >
            {isLoadingCep ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {cepLookupError && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {cepLookupError}
          </p>
        )}
        {address && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-zinc-700 rounded text-xs text-gray-700 dark:text-gray-300">
            <p className="font-semibold">Endereço de Entrega:</p>
            <p>
              {address.logradouro}, {address.bairro}
            </p>
            <p>
              {address.localidade} - {address.uf}
            </p>
          </div>
        )}
      </div>

      {/* Items List or Empty Cart Message */}
      <div className="flex-grow overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex-grow flex items-center justify-center p-4 h-full">
            <div className="text-center">
              <ShoppingCartIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                Seu carrinho está vazio.
              </p>
              {!persistedCep && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Adicione seu CEP acima para ver estimativas de entrega.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-3 p-2 bg-white dark:bg-zinc-800 rounded shadow"
              >
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center rounded flex-shrink-0">
                  <span className="text-xl">{item.icon || '🛍️'}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-brand-blue dark:text-dark-brand-blue">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Preço: R$ {item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 rounded border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      <MinusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="text-sm font-medium text-gray-800 dark:text-brand-off-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 rounded border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      <PlusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 flex-shrink-0"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Checkout Section */}
      {items.length > 0 && (
        <div className="p-4 border-t border-gray-300 dark:border-gray-600 space-y-3 flex-shrink-0">
          <div className="flex justify-between font-semibold text-brand-blue dark:text-dark-brand-blue">
            <span>Subtotal:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          {deliveryDate && (
            <div className="text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/20 p-2 rounded flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>
                Entrega estimada: <strong>{deliveryDate}</strong>
              </span>
            </div>
          )}
          {!deliveryDate && persistedCep && items.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400 p-2 rounded">
              <span>Calculando estimativa de entrega...</span>
            </div>
          )}
          {!persistedCep && items.length > 0 && (
            <div className="text-sm text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-500/20 p-2 rounded">
              <span>Informe seu CEP acima para estimar a entrega.</span>
            </div>
          )}

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded shadow-md transition duration-150"
            onClick={handleFinalizarCompra}
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
      // Desktop: Sidebar, respects max-height via cartContent
      <aside className="w-[500px] max-h-[calc(100vh-4rem)] sticky top-8 bg-brand-cart-bg dark:bg-dark-brand-cart-bg shadow-lg ml-4 hidden md:block rounded-lg overflow-hidden">
        {cartContent}
      </aside>
    );
  }

  return (
    // Mobile: Fixed drawer, respects max-height via cartContent
    <div
      className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="fixed top-4 bottom-4 left-1/2 w-full max-w-md bg-brand-cart-bg dark:bg-dark-brand-cart-bg shadow-xl flex flex-col rounded-lg overflow-hidden transform -translate-x-1/2"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartContent}
      </div>
    </div>
  );
};

export default CartDrawer;
