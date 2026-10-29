import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Customizer from './pages/Customizer';
import Viewer360 from './pages/Viewer360';
import TryOn from './pages/TryOn';
import Verify from './pages/Verify';
import SizeGuide from './pages/SizeGuide';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/customize/:id" element={<Customizer />} />
        <Route path="/viewer/:id" element={<Viewer360 />} />
        <Route path="/try-on" element={<TryOn />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

