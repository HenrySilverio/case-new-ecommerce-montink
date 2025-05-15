import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { completedOrderAtom } from '../../atoms/OrderConfirmation/orderConfirmationAtoms';
import { currentViewAtom } from '../../atoms/Cart/cartAtoms';

const OrderConfirmationPage: React.FC = () => {
  const orderDetails = useAtomValue(completedOrderAtom);
  const setCompletedOrder = useSetAtom(completedOrderAtom);
  const setCurrentView = useSetAtom(currentViewAtom);

  if (!orderDetails) {
    return (
      <div className="p-4 md:p-8 text-center">
        <p className="text-red-500">Erro: Detalhes do pedido não encontrados.</p>
      </div>
    );
  }

  const { items, total, deliveryDate, address } = orderDetails;

  return (
    <div className="min-h-screen bg-brand-off-white dark:bg-gray-900 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 shadow-xl rounded-lg p-6 md:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <CheckCircleIcon className="h-16 w-16 md:h-20 md:w-20 text-green-500 mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-brand-blue dark:text-brand-off-white mb-2">
            Obrigado pelo seu pedido!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Seu pedido foi recebido e está sendo processado.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 dark:border-gray-700">Resumo do Pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b dark:border-gray-700 last:border-b-0">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{item.icon}</span>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">{item.name} (x{item.quantity})</p>
                  {(item.selectedSize || item.selectedColor) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.selectedSize && `Tamanho: ${item.selectedSize}`}{item.selectedSize && item.selectedColor && ", "}
                      {item.selectedColor && `Cor: ${item.selectedColor}`}
                    </p>
                  )}
                </div>
              </div>
              <p className="font-medium text-gray-700 dark:text-gray-300">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-3 border-t-2 dark:border-gray-600">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">Total Pago:</p>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">R$ {total.toFixed(2)}</p>
          </div>
        </div>

        {deliveryDate && (
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-blue dark:text-blue-300 mb-1">Entrega Estimada</h3>
            <p className="text-gray-700 dark:text-gray-300">Sua entrega está prevista para: <strong>{deliveryDate}</strong></p>
            {address && (
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <p><strong>Endereço de Entrega:</strong></p>
                    <p>{address.logradouro}, {address.bairro}</p>
                    <p>{address.localidade} - {address.uf}, CEP: {address.cep}</p>
                </div>
            )}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Você receberá um e-mail de confirmação em breve. Para qualquer dúvida, entre em contato com nosso suporte.
          </p>
          <button
            onClick={() => {
              sessionStorage.clear();
              setCompletedOrder(null);
              setCurrentView('productList');
            }}
            className="mt-4 bg-brand-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

