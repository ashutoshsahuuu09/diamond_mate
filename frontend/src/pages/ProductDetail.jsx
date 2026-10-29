import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Shield, RotateCcw, Truck, RefreshCw, ArrowLeft,
  Sparkles, ShoppingBag, Camera, ChevronRight, CheckCircle2
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { getRing } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [ring, setRing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [ringSize, setRingSize] = useState(7);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getRing(id)
      .then((data) => { setRing(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <MainLayout>
      <div className="loading-center" style={{ paddingTop: 'calc(var(--nav-height) + 80px)' }}>
        <div className="loading-spinner" />
      </div>
    </MainLayout>
  );

  if (!ring) return (
    <MainLayout>
      <div className="text-center" style={{ paddingTop: 'calc(var(--nav-height) + 80px)', padding: '80px' }}>
        <h2>Ring not found</h2>
        <Link to="/collections" className="btn btn-primary mt-24">Back to Collections</Link>
      </div>
    </MainLayout>
  );

  const totalEst = ring.base_price + (ring.diamond?.carat || 1) * 165000 + 35000;

  const handleAddToCart = () => {
    addItem({
      ring_id: ring.id,
      ring_name: ring.name,
      image: ring.images?.[0] || '',
      metal: ring.metal,
      carat: ring.diamond?.carat || 1,
      setting: ring.collection,
      ring_size: ringSize,
      quantity: 1,
      unit_price: totalEst,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <MainLayout>
      <div className="product-detail page-enter">
        {/* Breadcrumb */}
        <div className="product-detail__breadcrumb">
          <div className="container">
            <button onClick={() => navigate(-1)} className="product-detail__back">
              <ArrowLeft size={16} /> Back
            </button>
            <span className="product-detail__crumb">
              <Link to="/collections">Collections</Link>
              <ChevronRight size={12} />
              <span>{ring.collection}</span>
              <ChevronRight size={12} />
              <span>{ring.name}</span>
            </span>
          </div>
        </div>

        <div className="container">
          <div className="product-detail__grid">
            {/* ── Gallery ── */}
            <div className="product-detail__gallery">
              <div className="product-detail__main-img">
                <img src={ring.images?.[activeImg]} alt={ring.name} />
                <Link to={`/viewer/${ring.id}`} className="product-detail__view360">
                  <RotateCcw size={16} />
                  <span>360° View</span>
                </Link>
              </div>
              <div className="product-detail__thumbnails">
                {ring.images?.map((img, i) => (
                  <button
                    key={i}
                    className={`product-detail__thumb ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Info ── */}
            <div className="product-detail__info">
              <div className="product-detail__collection">{ring.collection}</div>
              <h1 className="product-detail__name">{ring.name}</h1>

              <div className="product-detail__rating">
                <div className="stars">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} fill={s <= Math.round(ring.rating) ? 'currentColor' : 'none'} strokeWidth={1.5} />
                  ))}
                </div>
                <span className="product-detail__rating-text">{ring.rating} ({ring.review_count} reviews)</span>
              </div>

              <div className="product-detail__price">
                <div className="price-label">Estimated price</div>
                <div className="price">{formatPrice(totalEst)}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--warm-gray)', marginTop: 4 }}>
                  Base ring + diamond + setting
                </div>
              </div>

              {/* Diamond Info */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Diamond Details</h4>
                <div className="product-detail__specs">
                  {[
                    ['Carat', `${ring.diamond?.carat} ct`],
                    ['Cut', ring.diamond?.cut],
                    ['Colour', ring.diamond?.color],
                    ['Clarity', ring.diamond?.clarity],
                    ['Polish', ring.diamond?.polish],
                    ['Symmetry', ring.diamond?.symmetry],
                  ].map(([label, value]) => (
                    <div key={label} className="product-detail__spec">
                      <span className="product-detail__spec-label">{label}</span>
                      <span className="product-detail__spec-value">{value}</span>
                    </div>
                  ))}
                </div>
                {ring.diamond?.certificate_id && (
                  <Link
                    to={`/verify?cert=${ring.diamond.certificate_id}`}
                    className="product-detail__cert-link"
                  >
                    <Shield size={14} />
                    <span>View Certificate: {ring.diamond.certificate_id}</span>
                    <ChevronRight size={12} />
                  </Link>
                )}
              </div>

              {/* Metal */}
              <div className="product-detail__section">
                <h4 className="product-detail__section-title">Metal</h4>
                <div className="product-detail__metals">
                  {ring.metal_options?.map((m) => (
                    <div key={m} className={`product-detail__metal-tag ${m === ring.metal ? 'active' : ''}`}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ring Size */}
              <div className="product-detail__section">
                <div className="product-detail__size-header">
                  <h4 className="product-detail__section-title">Ring Size</h4>
                  <Link to="/size-guide" className="product-detail__size-guide">
                    Size Guide
                  </Link>
                </div>
                <div className="product-detail__sizes">
                  {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map((s) => (
                    <button
                      key={s}
                      className={`product-detail__size-btn ${ringSize === s ? 'active' : ''}`}
                      onClick={() => setRingSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="product-detail__actions">
                <Link to={`/customize/${ring.id}`} className="btn btn-ghost btn-lg w-full" style={{ justifyContent: 'center' }}>
                  <Sparkles size={18} />
                  Customize This Ring
                </Link>
                <Link to={`/try-on`} className="btn btn-outline btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                  <Camera size={18} />
                  Try It On
                </Link>
                <button
                  className={`btn btn-lg ${added ? 'product-detail__added-btn' : 'btn-primary'}`}
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <><CheckCircle2 size={18} /> Added!</>
                  ) : (
                    <><ShoppingBag size={18} /> Add to Bag</>
                  )}
                </button>
              </div>

              {/* Delivery */}
              <div className="product-detail__delivery">
                <div className="product-detail__delivery-item">
                  <Truck size={16} />
                  <span>Free delivery on orders above ₹1,00,000</span>
                </div>
                <div className="product-detail__delivery-item">
                  <RefreshCw size={16} />
                  <span>Free resizing within 30 days</span>
                </div>
                <div className="product-detail__delivery-item">
                  <Shield size={16} />
                  <span>Certificate included with every ring</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Reviews ── */}
          {ring.reviews?.length > 0 && (
            <div className="product-detail__reviews">
              <h3 className="product-detail__reviews-title">Customer Reviews</h3>
              <div className="product-detail__reviews-grid">
                {ring.reviews.map((rev, i) => (
                  <div key={i} className="product-detail__review card">
                    <div className="product-detail__review-header">
                      <div className="product-detail__review-avatar">
                        {rev.user_name.charAt(0)}
                      </div>
                      <div>
                        <div className="product-detail__review-name">{rev.user_name}</div>
                        <div className="stars">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={11} fill={s <= rev.rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="product-detail__review-comment">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
