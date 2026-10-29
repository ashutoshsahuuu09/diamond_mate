import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, Sparkles } from 'lucide-react';
import './ProductCard.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ ring }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const totalPrice =
    ring.base_price + (ring.diamond?.carat || 1) * 165000 + 35000;

  return (
    <div className="product-card card">
      {/* Image */}
      <div className="product-card__image-wrap">
        {!imgLoaded && <div className="product-card__image-skeleton" />}
        <img
          src={ring.images?.[0]}
          alt={ring.name}
          className={`product-card__image ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Overlay actions */}
        <div className="product-card__overlay">
          <Link
            to={`/product/${ring.id}`}
            className="product-card__overlay-btn"
            aria-label="View product"
          >
            <Eye size={16} />
            <span>View</span>
          </Link>
          <Link
            to={`/customize/${ring.id}`}
            className="product-card__overlay-btn product-card__overlay-btn--gold"
            aria-label="Customize ring"
          >
            <Sparkles size={16} />
            <span>Customize</span>
          </Link>
        </div>

        {/* Wishlist */}
        <button
          className={`product-card__wishlist ${wishlisted ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Badge */}
        {ring.is_featured && (
          <div className="product-card__badge">Featured</div>
        )}
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div className="product-card__collection">{ring.collection}</div>
        <h3 className="product-card__name">{ring.name}</h3>

        <div className="product-card__meta">
          <span className="product-card__metal">{ring.metal}</span>
          <span className="product-card__dot">·</span>
          <span className="product-card__carat">{ring.diamond?.carat} ct</span>
        </div>

        <div className="product-card__rating">
          <div className="stars">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                size={12}
                fill={s <= Math.round(ring.rating) ? 'currentColor' : 'none'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="product-card__review-count">({ring.review_count})</span>
        </div>

        <div className="product-card__footer">
          <div>
            <div className="price-label">Starting from</div>
            <div className="price">{formatPrice(ring.base_price)}</div>
          </div>
          <Link to={`/product/${ring.id}`} className="btn btn-ghost btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
