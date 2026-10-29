import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Shield, Truck, RefreshCw, Sparkles } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import './Cart.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function Cart() {
  const { items, subtotal, itemCount, removeItem } = useCart();
  const delivery = subtotal > 100000 ? 0 : 500;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="cart-empty">
          <div className="container">
            <div className="cart-empty__icon">
              <ShoppingBag size={60} strokeWidth={1} />
            </div>
            <h2 className="cart-empty__title">Your bag is empty</h2>
            <p className="cart-empty__text">
              Looks like you haven't added anything yet. Explore our collections to find your perfect ring.
            </p>
            <Link to="/collections" className="btn btn-primary btn-lg">
              Explore Collections
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="cart page-enter">
        <div className="cart__header">
          <div className="container">
            <h1 className="cart__title">
              <ShoppingBag size={28} strokeWidth={1.5} />
              Your Bag
            </h1>
            <p style={{ color: 'var(--charcoal-mid)' }}>{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="container">
          <div className="cart__layout">
            {/* ── Items ── */}
            <div className="cart__items">
              {items.map((item, i) => (
                <div key={`${item.ring_id}-${i}`} className="cart__item card">
                  <div className="cart__item-image">
                    <img src={item.image} alt={item.ring_name} />
                  </div>
                  <div className="cart__item-info">
                    <div className="cart__item-name">{item.ring_name}</div>
                    <div className="cart__item-config">
                      <span>{item.metal}</span>
                      <span>·</span>
                      <span>{item.carat} ct</span>
                      <span>·</span>
                      <span>{item.setting} setting</span>
                      <span>·</span>
                      <span>Size {item.ring_size}</span>
                    </div>
                    <div className="cart__item-qty">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="cart__item-right">
                    <div className="cart__item-price">{formatPrice(item.unit_price * item.quantity)}</div>
                    <div className="cart__item-actions">
                      <Link to={`/customize/${item.ring_id}`} className="cart__action-btn">
                        <Sparkles size={14} />
                        <span>Edit</span>
                      </Link>
                      <button
                        className="cart__action-btn cart__action-btn--danger"
                        onClick={() => removeItem(item.ring_id)}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Summary ── */}
            <div className="cart__summary">
              <div className="cart__summary-card card">
                <h3 className="cart__summary-title">Order Summary</h3>

                <div className="cart__summary-rows">
                  <div className="cart__summary-row">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="cart__summary-row">
                    <span>Delivery</span>
                    <span>{delivery === 0 ? <span style={{ color: '#2e7d32' }}>Free</span> : formatPrice(delivery)}</span>
                  </div>
                </div>

                <div className="cart__summary-total">
                  <span>Total</span>
                  <span className="price">{formatPrice(total)}</span>
                </div>

                {delivery === 0 && (
                  <div className="cart__free-delivery">
                    <Truck size={14} />
                    <span>Free delivery applied!</span>
                  </div>
                )}
                {delivery > 0 && (
                  <div className="cart__free-delivery-msg">
                    Add {formatPrice(100000 - subtotal)} more for free delivery
                  </div>
                )}

                <Link
                  to="/checkout"
                  className="btn btn-primary btn-lg w-full"
                  style={{ justifyContent: 'center', marginTop: 20 }}
                >
                  <Shield size={18} />
                  Proceed to Secure Checkout
                </Link>

                <div className="cart__trust">
                  <div className="cart__trust-item"><Shield size={14} /> Secure Payment</div>
                  <div className="cart__trust-item"><RefreshCw size={14} /> Free Resizing</div>
                  <div className="cart__trust-item"><Truck size={14} /> Insured Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
