import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Diamond, Search, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const navLinks = [
  { label: 'Collections', path: '/collections' },
  { label: 'Customize', path: '/customize/new' },
  { label: 'Verify', path: '/verify' },
  { label: 'Size Guide', path: '/size-guide' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navClass = [
    'navbar',
    isHome && !scrolled ? 'navbar--transparent' : 'navbar--solid',
    scrolled ? 'navbar--scrolled' : '',
  ].join(' ');

  return (
    <nav className={navClass}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <Diamond size={22} strokeWidth={1.5} />
          <span className="navbar__logo-text">DiamondMate</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <Link to="/collections" className="navbar__icon-btn" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="navbar__cart-count">{itemCount}</span>
            )}
          </Link>
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__mobile-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/cart" className="navbar__mobile-link">
          Cart {itemCount > 0 && `(${itemCount})`}
        </Link>
      </div>
    </nav>
  );
}
