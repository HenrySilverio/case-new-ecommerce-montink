import { ShoppingCartIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { cartDrawerOpenAtom } from '../../atoms/Cart/cartAtoms';
import { themeAtom } from '../../atoms/Theme/themeAtoms';
import { cepAtom } from '../../atoms/Cep/cepAtoms';

const Header: React.FC = () => {
  const [currentCepInput, setCurrentCepInput] = useState('');
  const [savedCep, setSavedCep] = useAtom(cepAtom);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [, setIsOpen] = useAtom(cartDrawerOpenAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (savedCep) {
      setCurrentCepInput(savedCep);
    }
  }, [savedCep]);

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCepInput(event.target.value);
  };

  const handleCepSave = () => {
    setSavedCep(currentCepInput);
    alert(
      `CEP "${currentCepInput}" salvo!`,
    );
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-brand-blue text-brand-off-white dark:bg-dark-brand-blue dark:text-dark-brand-off-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">New Products</h1>

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={currentCepInput}
                onChange={handleCepChange}
                className="px-2 py-1 rounded-l text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-off-white dark:focus:ring-orange-400"
              />
              <button
                onClick={handleCepSave}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-r text-sm"
              >
                Salvar CEP
              </button>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10"
            title={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </button>

          {/* Cart Icon */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10"
              title="Abrir carrinho"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      {/* CEP input for mobile */}
      {isMobile && (
        <div className="mt-3 flex items-center justify-center">
          <input
            type="text"
            placeholder="Seu CEP"
            value={currentCepInput}
            onChange={handleCepChange}
            className="px-2 py-1 rounded-l text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-brand-off-white dark:focus:ring-orange-400"
          />
          <button
            onClick={handleCepSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-r text-sm"
          >
            OK
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
