import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ChevronRight, Check, CreditCard, Truck } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import './Checkout.css';

const STEPS = ['Contact', 'Delivery', 'Payment', 'Confirm'];

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    payment: 'card',
    card_number: '', card_name: '', card_expiry: '', card_cvv: '',
  });

  const delivery = subtotal > 100000 ? 0 : 500;
  const total = subtotal + delivery;

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handlePlace = async () => {
    setPlacing(true);
    try {
      const order = await createOrder({
        user_id: 'guest_user',
        items,
        address: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        payment_method: form.payment,
      });
      clearCart();
      navigate('/order-confirmation', { state: { order } });
    } catch {
      // On backend failure, still show confirmation with demo data
      clearCart();
      navigate('/order-confirmation', {
        state: {
          order: {
            order_id: `DM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
            status: 'confirmed',
            estimated_delivery: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            total,
            items,
          },
        },
      });
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="checkout-empty">
          <h2>Nothing to checkout</h2>
          <Link to="/collections" className="btn btn-primary mt-24">Browse Collections</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="checkout page-enter">
        <div className="checkout__header">
          <div className="container">
            <h1 className="checkout__title">Secure Checkout</h1>
            {/* Progress */}
            <div className="checkout__steps">
              {STEPS.map((s, i) => (
                <div key={s} className="checkout__step-item">
                  <div className={`checkout__step-num ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`checkout__step-label ${i === step ? 'active' : ''}`}>{s}</span>
                  {i < STEPS.length - 1 && <ChevronRight size={16} className="checkout__step-arrow" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="checkout__layout">
            {/* ── Form ── */}
            <div className="checkout__form-wrap">
              {/* Step 0: Contact */}
              {step === 0 && (
                <div className="checkout__section card">
                  <h2 className="checkout__section-title">Contact Information</h2>
                  <div className="checkout__fields">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="Your full name" value={form.name} onChange={(e) => setField('name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg w-full checkout__next-btn" onClick={handleNext} style={{ justifyContent: 'center' }}>
                    Continue to Delivery <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 1: Delivery */}
              {step === 1 && (
                <div className="checkout__section card">
                  <h2 className="checkout__section-title">Delivery Address</h2>
                  <div className="checkout__fields">
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Street Address *</label>
                      <input className="form-input" placeholder="House no., Street, Area" value={form.address} onChange={(e) => setField('address', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input className="form-input" placeholder="Mumbai" value={form.city} onChange={(e) => setField('city', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input className="form-input" placeholder="Maharashtra" value={form.state} onChange={(e) => setField('state', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">PIN Code *</label>
                      <input className="form-input" placeholder="400001" value={form.pincode} onChange={(e) => setField('pincode', e.target.value)} />
                    </div>
                  </div>
                  <div className="checkout__delivery-note">
                    <Truck size={16} />
                    <span>Estimated delivery: 5-8 business days. All shipments are insured.</span>
                  </div>
                  <div className="checkout__nav">
                    <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                    <button className="btn btn-primary btn-lg" onClick={handleNext} style={{ flex: 1, justifyContent: 'center' }}>
                      Continue to Payment <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="checkout__section card">
                  <h2 className="checkout__section-title">Payment</h2>

                  <div className="checkout__payment-methods">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                      { id: 'upi', label: 'UPI', icon: '📱' },
                      { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    ].map((m) => (
                      <label key={m.id} className={`checkout__payment-method ${form.payment === m.id ? 'active' : ''}`}>
                        <input type="radio" value={m.id} checked={form.payment === m.id} onChange={(e) => setField('payment', e.target.value)} />
                        <span className="checkout__payment-icon">{m.icon}</span>
                        <span>{m.label}</span>
                      </label>
                    ))}
                  </div>

                  {form.payment === 'card' && (
                    <div className="checkout__card-fields">
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Card Number</label>
                        <input className="form-input" placeholder="•••• •••• •••• ••••" maxLength={19} value={form.card_number} onChange={(e) => setField('card_number', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Cardholder Name</label>
                        <input className="form-input" placeholder="Name on card" value={form.card_name} onChange={(e) => setField('card_name', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Expiry (MM/YY)</label>
                        <input className="form-input" placeholder="MM/YY" maxLength={5} value={form.card_expiry} onChange={(e) => setField('card_expiry', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input className="form-input" placeholder="•••" maxLength={4} type="password" value={form.card_cvv} onChange={(e) => setField('card_cvv', e.target.value)} />
                      </div>
                    </div>
                  )}

                  {form.payment !== 'card' && (
                    <div className="checkout__payment-placeholder">
                      <div className="checkout__payment-placeholder-icon">🔒</div>
                      <p>You'll be redirected to a secure {form.payment === 'upi' ? 'UPI' : 'net banking'} payment page after order confirmation.</p>
                    </div>
                  )}

                  <div className="checkout__secure-note">
                    <Shield size={14} />
                    <span>Your payment information is encrypted and secure. We do not store card details.</span>
                  </div>

                  <div className="checkout__nav">
                    <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary btn-lg" onClick={handleNext} style={{ flex: 1, justifyContent: 'center' }}>
                      Review Order <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div className="checkout__section card">
                  <h2 className="checkout__section-title">Review & Place Order</h2>
                  <div className="checkout__review">
                    <div className="checkout__review-section">
                      <div className="checkout__review-label">Contact</div>
                      <div>{form.name} · {form.email} · {form.phone}</div>
                    </div>
                    <div className="checkout__review-section">
                      <div className="checkout__review-label">Delivery</div>
                      <div>{form.address}, {form.city}, {form.state} — {form.pincode}</div>
                    </div>
                    <div className="checkout__review-section">
                      <div className="checkout__review-label">Payment</div>
                      <div>{form.payment === 'card' ? `Card ending ${form.card_number.slice(-4) || '----'}` : form.payment.toUpperCase()}</div>
                    </div>
                  </div>

                  <div className="checkout__trust-row">
                    <div className="checkout__trust-badge"><Shield size={14} /> Secure Payment</div>
                    <div className="checkout__trust-badge"><Truck size={14} /> Free Resize</div>
                    <div className="checkout__trust-badge"><Check size={14} /> Easy Returns</div>
                  </div>

                  <div className="checkout__nav">
                    <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handlePlace}
                      disabled={placing}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      {placing ? (
                        <><div className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Placing Order...</>
                      ) : (
                        <><Shield size={16} /> Place Order — {formatPrice(total)}</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Order Summary ── */}
            <div className="checkout__order-summary">
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 20 }}>Order Summary</h3>
                {items.map((item, i) => (
                  <div key={i} className="checkout__order-item">
                    <img src={item.image} alt={item.ring_name} className="checkout__order-thumb" />
                    <div className="checkout__order-item-info">
                      <div className="checkout__order-item-name">{item.ring_name}</div>
                      <div className="checkout__order-item-meta">{item.metal} · {item.carat} ct · Size {item.ring_size}</div>
                    </div>
                    <div className="checkout__order-item-price">{formatPrice(item.unit_price)}</div>
                  </div>
                ))}
                <div className="checkout__summary-rows">
                  <div className="checkout__summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="checkout__summary-row"><span>Delivery</span><span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span></div>
                  <div className="checkout__summary-total"><span>Total</span><span className="price">{formatPrice(total)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
