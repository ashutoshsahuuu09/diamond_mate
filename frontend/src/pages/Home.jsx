import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, RotateCcw, Smartphone, Lock, ChevronRight, Star,
  Sparkles, Diamond, ArrowRight
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import { getFeaturedRings } from '../services/api';
import './Home.css';

const TRUST_BADGES = [
  { icon: Shield, label: 'Certified Diamonds', desc: 'Every diamond comes with a quality certificate' },
  { icon: RotateCcw, label: '360° Product View', desc: 'See every angle before you buy' },
  { icon: Smartphone, label: 'Virtual Try-On', desc: 'Try the ring on using your camera' },
  { icon: Lock, label: 'Secure Payment', desc: 'Your data and payments are protected' },
];

const COLLECTIONS = [
  {
    name: 'Solitaire',
    desc: 'Timeless simplicity',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
    accent: '#c9a84c',
  },
  {
    name: 'Halo',
    desc: 'Luminous brilliance',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    accent: '#a0856b',
  },
  {
    name: 'Vintage',
    desc: 'Heritage elegance',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600',
    accent: '#8b7355',
  },
  {
    name: 'Eternity',
    desc: 'Endless devotion',
    image: 'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600',
    accent: '#7a8fa6',
  },
];

const JOURNEY_STEPS = [
  { num: '01', title: 'Discover', desc: 'Browse our curated collections of certified diamond rings.' },
  { num: '02', title: 'Customize', desc: 'Choose your metal, diamond size, and setting to create your perfect ring.' },
  { num: '03', title: 'Visualize', desc: 'See your ring in 360° and virtually try it on at home.' },
  { num: '04', title: 'Verify', desc: 'Read the diamond certificate and understand every quality detail.' },
  { num: '05', title: 'Purchase', desc: 'Checkout securely and track your order every step of the way.' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedRings()
      .then(setFeatured)
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85"
            alt="Diamond engagement ring hero"
            className="hero__bg-img"
          />
          <div className="hero__overlay" />
        </div>

        <div className="container hero__content">
          <div className="hero__text page-enter">
            <div className="hero__eyebrow">
              <Diamond size={14} strokeWidth={1.5} />
              <span>Premium Diamond Boutique</span>
            </div>

            <h1 className="hero__title">
              Find a ring worth<br />
              <em>saying yes to.</em>
            </h1>

            <p className="hero__subtitle">
              Explore certified diamonds, personalise your ring, try it virtually,
              verify its quality, and purchase with complete confidence.
            </p>

            <div className="hero__ctas">
              <Link to="/collections" className="btn btn-primary btn-lg">
                Explore Collections
                <ArrowRight size={18} />
              </Link>
              <Link to="/customize/new" className="btn btn-white btn-lg">
                <Sparkles size={18} />
                Design Your Ring
              </Link>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="hero__trust">
          <div className="container">
            <div className="hero__trust-grid">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="hero__trust-item">
                  <b.icon size={20} strokeWidth={1.5} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Collections ───────────────────────────────────────── */}
      <section className="section home-collections">
        <div className="container">
          <div className="text-center mb-32">
            <div className="section-label">Our Collections</div>
            <h2 className="section-title">Crafted for every love story</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Four distinct styles, each telling a different story of love. Find the one that speaks to your heart.
            </p>
          </div>

          <div className="collection-grid">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.name}
                to={`/collections?collection=${col.name}`}
                className="collection-card"
              >
                <div className="collection-card__image-wrap">
                  <img src={col.image} alt={col.name} className="collection-card__image" />
                  <div className="collection-card__overlay" />
                </div>
                <div className="collection-card__content">
                  <div className="collection-card__name">{col.name}</div>
                  <div className="collection-card__desc">{col.desc}</div>
                  <div className="collection-card__link">
                    <span>Explore</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── See it, Verify it, Make it yours ──────────────────── */}
      <section className="section home-verify" style={{ background: 'var(--ivory-dark)' }}>
        <div className="container">
          <div className="home-verify__grid">
            <div className="home-verify__text">
              <div className="section-label">Our Promise</div>
              <h2 className="section-title">
                See it. Verify it.<br />
                <em>Make it yours.</em>
              </h2>
              <div className="gold-divider" />
              <p className="section-subtitle">
                We believe that buying a diamond ring should feel as beautiful as wearing one.
                Every DiamondMate ring comes with a quality certificate, a 360° view, and a virtual try-on
                — so you can purchase with complete peace of mind.
              </p>
              <div className="home-verify__features">
                {[
                  ['💎', 'Certified Quality', 'Every diamond is graded and certified before it reaches you.'],
                  ['🔍', 'Full Transparency', 'Understand every detail of your diamond — cut, colour, clarity, carat.'],
                  ['🎯', 'Personalized', 'Design a ring that is uniquely yours with our ring customizer.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="home-verify__feature">
                    <span className="home-verify__icon">{icon}</span>
                    <div>
                      <div className="home-verify__feature-title">{title}</div>
                      <div className="home-verify__feature-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/verify" className="btn btn-primary mt-24">
                Verify a Diamond
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="home-verify__image">
              <img
                src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800"
                alt="Diamond ring close up"
              />
              <div className="home-verify__cert-badge">
                <Shield size={18} strokeWidth={1.5} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Demo Certified</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--warm-gray)' }}>Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Rings ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="home-featured__header">
            <div>
              <div className="section-label">Featured Rings</div>
              <h2 className="section-title">Our most-loved pieces</h2>
            </div>
            <Link to="/collections" className="btn btn-ghost">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="loading-center"><div className="loading-spinner" /></div>
          ) : featured.length > 0 ? (
            <div className="grid-4">
              {featured.slice(0, 4).map((ring) => (
                <ProductCard key={ring.id} ring={ring} />
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: '48px', color: 'var(--warm-gray)' }}>
              <p>Connect the backend to load featured rings.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Customer Journey ──────────────────────────────────── */}
      <section className="section home-journey" style={{ background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="text-center mb-32">
            <div className="section-label" style={{ color: 'var(--gold-light)' }}>Your Journey</div>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>
              Discover → Explore → Customize → Purchase
            </h2>
          </div>
          <div className="journey-steps">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.num} className="journey-step">
                <div className="journey-step__num">{step.num}</div>
                <div className="journey-step__title">{step.title}</div>
                <div className="journey-step__desc">{step.desc}</div>
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="journey-step__arrow"><ChevronRight size={20} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta__content">
            <h2 className="home-cta__title">Ready to find <em>the one?</em></h2>
            <p className="home-cta__subtitle">
              Start by exploring our collections or design a custom ring from scratch.
            </p>
            <div className="flex gap-16 items-center" style={{ flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn btn-primary btn-lg">
                Explore Collections
              </Link>
              <Link to="/customize/new" className="btn btn-outline btn-lg">
                Design Custom Ring
              </Link>
            </div>
          </div>
          <div className="home-cta__image">
            <img
              src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600"
              alt="Premium diamond ring"
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
