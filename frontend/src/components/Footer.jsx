import { Link } from 'react-router-dom';
import { Diamond, Mail, Phone } from 'lucide-react';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <Diamond size={20} strokeWidth={1.5} />
                <span>DiamondMate</span>
              </div>
              <p className="footer__tagline">
                Your personal online diamond boutique. Every ring tells a story worth telling.
              </p>
              <div className="footer__social">
                <a href="#" aria-label="Instagram" className="footer__social-link"><InstagramIcon /></a>
                <a href="#" aria-label="Facebook" className="footer__social-link"><FacebookIcon /></a>
                <a href="#" aria-label="Twitter" className="footer__social-link"><TwitterIcon /></a>
              </div>
            </div>

            {/* Explore */}
            <div className="footer__col">
              <h4 className="footer__col-title">Explore</h4>
              <ul className="footer__list">
                <li><Link to="/collections?collection=Solitaire">Solitaire Rings</Link></li>
                <li><Link to="/collections?collection=Halo">Halo Rings</Link></li>
                <li><Link to="/collections?collection=Vintage">Vintage Rings</Link></li>
                <li><Link to="/collections?collection=Eternity">Eternity Bands</Link></li>
                <li><Link to="/collections">All Collections</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h4 className="footer__col-title">Services</h4>
              <ul className="footer__list">
                <li><Link to="/customize/new">Design Your Ring</Link></li>
                <li><Link to="/try-on">Virtual Try-On</Link></li>
                <li><Link to="/verify">Diamond Verification</Link></li>
                <li><Link to="/size-guide">Ring Size Guide</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__col-title">Contact</h4>
              <ul className="footer__list footer__contact">
                <li><Mail size={15} /><span>hello@diamondmate.in</span></li>
                <li><Phone size={15} /><span>+91 98765 43210</span></li>
              </ul>
              <div className="footer__trust">
                <div className="footer__trust-item">🔒 Secure Payments</div>
                <div className="footer__trust-item">💎 Certified Diamonds</div>
                <div className="footer__trust-item">↩️ Easy Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© 2024 DiamondMate. All rights reserved. | Diamond data shown is for demonstration purposes.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
