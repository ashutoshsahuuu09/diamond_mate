import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { getRing, createCustomization } from '../services/api';
import { useCart } from '../context/CartContext';
import './Customizer.css';

const METALS = ['18K Gold', 'Platinum', 'Rose Gold', 'White Gold'];
const CARATS = [0.8, 1.0, 1.2, 1.5, 2.0];
const SETTINGS = ['Solitaire', 'Halo', 'Vintage', 'Eternity'];
const SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11];

const METAL_PRICES = { '18K Gold': 35000, Platinum: 55000, 'Rose Gold': 32000, 'White Gold': 38000 };
const CARAT_PRICES = { 0.8: 120000, 1.0: 165000, 1.2: 210000, 1.5: 285000, 2.0: 420000 };
const SETTING_PRICES = { Solitaire: 0, Halo: 18000, Vintage: 22000, Eternity: 28000 };

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function Customizer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const isNew = id === 'new';

  const [ring, setRing] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [metal, setMetal] = useState('18K Gold');
  const [carat, setCarat] = useState(1.0);
  const [setting, setSetting] = useState('Solitaire');
  const [ringSize, setRingSize] = useState(7);

  useEffect(() => {
    if (!isNew) {
      getRing(id)
        .then((data) => {
          setRing(data);
          setMetal(data.metal || '18K Gold');
          setCarat(data.diamond?.carat || 1.0);
          setSetting(data.collection || 'Solitaire');
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, isNew]);

  const basePrice = ring?.base_price || 80000;
  const diamondPrice = CARAT_PRICES[carat] || 165000;
  const metalPrice = METAL_PRICES[metal] || 35000;
  const settingPrice = SETTING_PRICES[setting] || 0;
  const totalPrice = basePrice + diamondPrice + metalPrice + settingPrice;

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!isNew) {
        await createCustomization({
          ring_id: id,
          metal,
          carat,
          setting,
          ring_size: ringSize,
        });
      }
      addItem({
        ring_id: isNew ? 'custom' : id,
        ring_name: ring?.name || 'Custom Ring',
        image: ring?.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
        metal,
        carat,
        setting,
        ring_size: ringSize,
        quantity: 1,
        unit_price: totalPrice,
      });
      navigate('/cart');
    } catch {
      // still proceed
      navigate('/cart');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="loading-center" style={{ paddingTop: 'calc(var(--nav-height) + 80px)' }}>
        <div className="loading-spinner" />
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="customizer page-enter">
        <div className="customizer__header">
          <div className="container">
            <button onClick={() => navigate(-1)} className="product-detail__back">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="customizer__title">Design Your Ring</h1>
            <p className="customizer__subtitle">
              Personalise every detail to create a ring that is uniquely yours.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="customizer__grid">
            {/* ── Preview Panel ── */}
            <div className="customizer__preview">
              <div className="customizer__preview-img">
                <img
                  src={ring?.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600'}
                  alt="Ring preview"
                />
                <div className="customizer__preview-overlay">
                  <span className="customizer__preview-setting">{setting}</span>
                </div>
              </div>
              <div className="customizer__preview-name">
                {ring?.name || 'Custom Ring'}
              </div>
              <div className="customizer__preview-config">
                <span>{metal}</span>
                <span className="product-detail__dot">·</span>
                <span>{carat} ct</span>
                <span className="product-detail__dot">·</span>
                <span>Size {ringSize}</span>
              </div>

              {/* Price Summary */}
              <div className="customizer__price-summary">
                <div className="customizer__price-row">
                  <span>Base Ring</span>
                  <span>{formatPrice(basePrice)}</span>
                </div>
                <div className="customizer__price-row">
                  <span>Diamond ({carat} ct)</span>
                  <span>{formatPrice(diamondPrice)}</span>
                </div>
                <div className="customizer__price-row">
                  <span>Metal ({metal})</span>
                  <span>{formatPrice(metalPrice)}</span>
                </div>
                <div className="customizer__price-row">
                  <span>Setting ({setting})</span>
                  <span>{settingPrice > 0 ? formatPrice(settingPrice) : 'Included'}</span>
                </div>
                <div className="customizer__price-total">
                  <span>Total</span>
                  <span className="price">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* ── Options ── */}
            <div className="customizer__options">
              {/* Metal */}
              <div className="customizer__option-group">
                <h3 className="customizer__option-title">
                  Metal <span className="customizer__option-selected">— {metal}</span>
                </h3>
                <div className="customizer__metal-grid">
                  {METALS.map((m) => (
                    <button
                      key={m}
                      className={`customizer__metal-btn ${metal === m ? 'active' : ''}`}
                      onClick={() => setMetal(m)}
                    >
                      <div className={`customizer__metal-swatch customizer__metal-swatch--${m.replace(/\s+/g, '-').toLowerCase()}`} />
                      <span>{m}</span>
                      <span className="customizer__metal-price">+{formatPrice(METAL_PRICES[m])}</span>
                      {metal === m && <Check size={14} className="customizer__check" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diamond */}
              <div className="customizer__option-group">
                <h3 className="customizer__option-title">
                  Diamond <span className="customizer__option-selected">— {carat} ct</span>
                </h3>
                <div className="customizer__carat-grid">
                  {CARATS.map((c) => (
                    <button
                      key={c}
                      className={`customizer__carat-btn ${carat === c ? 'active' : ''}`}
                      onClick={() => setCarat(c)}
                    >
                      <div className="customizer__carat-diamond">💎</div>
                      <div className="customizer__carat-label">{c} ct</div>
                      <div className="customizer__carat-price">{formatPrice(CARAT_PRICES[c])}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting */}
              <div className="customizer__option-group">
                <h3 className="customizer__option-title">
                  Setting <span className="customizer__option-selected">— {setting}</span>
                </h3>
                <div className="customizer__setting-grid">
                  {SETTINGS.map((s) => (
                    <button
                      key={s}
                      className={`customizer__setting-btn ${setting === s ? 'active' : ''}`}
                      onClick={() => setSetting(s)}
                    >
                      <div className="customizer__setting-name">{s}</div>
                      <div className="customizer__setting-price">
                        {SETTING_PRICES[s] === 0 ? 'Included' : `+${formatPrice(SETTING_PRICES[s])}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Size */}
              <div className="customizer__option-group">
                <div className="customizer__size-header">
                  <h3 className="customizer__option-title">
                    Ring Size <span className="customizer__option-selected">— Size {ringSize}</span>
                  </h3>
                  <Link to="/size-guide" className="customizer__size-guide">Size Guide</Link>
                </div>
                <div className="customizer__sizes">
                  {SIZES.map((s) => (
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

              {/* CTA */}
              <div className="customizer__actions">
                <button
                  className="btn btn-primary btn-lg w-full"
                  style={{ justifyContent: 'center' }}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <><div className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Saving...</>
                  ) : (
                    <><ShoppingBag size={18} /> Add to Bag — {formatPrice(totalPrice)}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
