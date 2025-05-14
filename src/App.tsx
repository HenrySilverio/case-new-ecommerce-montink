import { useAtom } from 'jotai';
import './App.css';
import { themeAtom } from './atoms/Theme/themeAtoms';
import CartDrawer from './components/CartDrawer/cartDrawer.component';
import Footer from './components/Footer/footer.component';
import Header from './components/Header/header.component';
import { useEffect } from 'react';

function App() {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex">
        <CartDrawer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
