import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { ShoppingCartIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { cartDrawerOpenAtom } from '../../atoms/Cart/cartAtoms';
import { themeAtom } from '../../atoms/Theme/themeAtoms';

const Header: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useAtom(themeAtom);
  const [, setCartOpen] = useAtom(cartDrawerOpenAtom);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <header className="bg-brand-blue text-brand-off-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">New Products</h1>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label={currentTheme === 'light' ? "Ativar modo escuro" : "Ativar modo claro"}
          >
            {currentTheme === 'light' ? <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" /> : <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>

          {isMobile && (
            <button 
              onClick={() => setCartOpen(true)} 
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Abrir carrinho"
            >
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

