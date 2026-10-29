import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, Shield, Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import './OrderConfirmation.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/collections" replace />;
  }

  return (
    <MainLayout>
      <div className="order-confirm page-enter">
        <div className="container">
          <div className="order-confirm__card card">
            {/* Success Header */}
            <div className="order-confirm__header">
              <div className="order-confirm__badge">
                <CheckCircle2 size={40} strokeWidth={1.8} />
              </div>
              <span className="order-confirm__label">Order Confirmed</span>
              <h1 className="order-confirm__title">Thank You For Your Order</h1>
              <p className="order-confirm__subtitle">
                Your bespoke piece is now being handcrafted by our master artisans.
              </p>
              <div className="order-confirm__id-pill">
                <span>Order Reference:</span>
                <strong>{order.order_id || 'DM-ORDER'}</strong>
              </div>
            </div>

            {/* Order Highlights */}
            <div className="order-confirm__meta-grid">
              <div className="order-confirm__meta-box">
                <Calendar size={20} className="order-confirm__meta-icon" />
                <div>
                  <div className="order-confirm__meta-label">Estimated Delivery</div>
                  <div className="order-confirm__meta-val">{order.estimated_delivery || '5-7 Business Days'}</div>
                </div>
              </div>
              <div className="order-confirm__meta-box">
                <Shield size={20} className="order-confirm__meta-icon" />
                <div>
                  <div className="order-confirm__meta-label">Certification & Insurance</div>
                  <div className="order-confirm__meta-val">100% Insured Shipping</div>
                </div>
              </div>
              <div className="order-confirm__meta-box">
                <Package size={20} className="order-confirm__meta-icon" />
                <div>
                  <div className="order-confirm__meta-label">Packaging</div>
                  <div className="order-confirm__meta-val">Signature Velvet Box</div>
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <div className="order-confirm__section">
              <h3 className="order-confirm__section-title">Order Summary</h3>
              <div className="order-confirm__items">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="order-confirm__item">
                    <div className="order-confirm__item-img">
                      {item.image ? (
                        <img src={item.image} alt={item.ring_name} />
                      ) : (
                        <Sparkles size={24} color="var(--gold)" />
                      )}
                    </div>
                    <div className="order-confirm__item-details">
                      <h4>{item.ring_name}</h4>
                      <div className="order-confirm__item-specs">
                        {item.metal && <span>{item.metal}</span>}
                        {item.carat && <span>{item.carat} ct</span>}
                        {item.setting && <span>{item.setting} Setting</span>}
                        {item.ring_size && <span>Size {item.ring_size}</span>}
                        <span>Qty: {item.quantity || 1}</span>
                      </div>
                    </div>
                    <div className="order-confirm__item-price">
                      {formatPrice((item.unit_price || 0) * (item.quantity || 1))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-confirm__totals">
                <div className="order-confirm__total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal || order.total || 0)}</span>
                </div>
                <div className="order-confirm__total-row">
                  <span>Insured Express Shipping</span>
                  <span className="order-confirm__free">Complimentary</span>
                </div>
                <div className="order-confirm__total-row order-confirm__total-row--grand">
                  <span>Total Paid</span>
                  <span>{formatPrice(order.total || 0)}</span>
                </div>
              </div>
            </div>

            {/* Address if present */}
            {order.address && (
              <div className="order-confirm__section">
                <h3 className="order-confirm__section-title">Shipping Address</h3>
                <div className="order-confirm__address">
                  <MapPin size={18} className="order-confirm__pin-icon" />
                  <div>
                    <strong>{order.address.name}</strong>
                    <p>{order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
                    <p>Phone: {order.address.phone} | Email: {order.address.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="order-confirm__actions">
              <Link to="/collections" className="btn btn-primary btn-lg">
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/" className="btn btn-ghost btn-lg">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

