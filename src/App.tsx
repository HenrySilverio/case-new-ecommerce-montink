import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { currentViewAtom } from './atoms/Cart/cartAtoms';
import { themeAtom } from './atoms/Theme/themeAtoms';
import CartDrawer from './components/CartDrawer/cartDrawer.component';
import Footer from './components/Footer/footer.component';
import Header from './components/Header/header.component';
import OrderConfirmationPage from './components/OrderConfirmation/orderConfirmation.component';
import ProductDetailPage from './components/ProductDetail/ProductDetailPage.component';
import ProductList from './components/ProductList/productList.component';
import PromotionalCarousel from './components/PromotionalCarousel/promotionalCarousel.component';

function App() {
  const [theme] = useAtom(themeAtom);
  const currentView = useAtomValue(currentViewAtom);

  const renderView = () => {
    switch (currentView) {
      case 'productList':
        return (
          <>
            <PromotionalCarousel />
            <ProductList />
          </>
        );
      case 'productDetail':
        return <ProductDetailPage />;
      case 'orderConfirmation':
        return <OrderConfirmationPage />;
      default:
        return (
          <>
            <PromotionalCarousel />
            <ProductList />
          </>
        );
    }
  };

  return (
    <div className={`${theme} flex flex-col min-h-screen bg-brand-off-white dark:bg-gray-900 text-gray-900 dark:text-brand-off-white transition-colors duration-300`}>
      <Header />
      <main className="flex-grow container mx-auto p-4 flex">
        <div className="flex-grow">
          {renderView()}
        </div>
        {currentView !== 'orderConfirmation' && <CartDrawer />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

