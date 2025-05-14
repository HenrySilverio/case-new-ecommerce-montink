import './App.css';
import CartDrawer from './components/CartDrawer/cartDrawer.component';
import Footer from './components/Footer/footer.component';

function App() {
  return (
    <div className="App">
      <main className='flex-grow container mx-auto p-4 flex'>
        <CartDrawer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
