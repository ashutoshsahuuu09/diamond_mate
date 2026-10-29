import { useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RotateCcw, ZoomIn, ZoomOut, RefreshCw, Sparkles, Info } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import './Viewer360.css';

export default function Viewer360() {
  const { id } = useParams();
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const containerRef = useRef(null);

  // ── Drag to rotate ──────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation((r) => r + delta * 0.8);
    setStartX(e.clientX);
  }, [isDragging, startX]);

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  const onTouchStart = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation((r) => r + delta * 0.8);
    setStartX(e.touches[0].clientX);
  }, [isDragging, startX]);

  const onTouchEnd = useCallback(() => setIsDragging(false), []);

  const handleReset = () => { setRotation(0); setZoom(1); };

  // Derive visual tilt from rotation for 2D parallax illusion
  const normalizedRot = ((rotation % 360) + 360) % 360;
  const skewX = Math.sin(rotation * 0.017) * 8;

  return (
    <MainLayout>
      <div className="viewer360 page-enter">
        <div className="viewer360__header">
          <div className="container">
            <h1 className="viewer360__title">
              <RotateCcw size={24} />
              360° Product Viewer
            </h1>
            <p className="viewer360__subtitle">
              Drag to rotate · Scroll to zoom · See every angle before you buy
            </p>
          </div>
        </div>

        <div className="container">
          <div className="viewer360__layout">
            {/* ── Main Viewer ── */}
            <div className="viewer360__stage-wrap">
              <div
                ref={containerRef}
                className={`viewer360__stage ${isDragging ? 'dragging' : ''}`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Ring image with CSS rotation illusion */}
                <div
                  className="viewer360__ring-container"
                  style={{
                    transform: `scale(${zoom}) rotateY(${rotation * 0.3}deg) rotateX(${skewX}deg)`,
                    filter: `drop-shadow(0 ${20 + zoom * 10}px ${40 + zoom * 20}px rgba(201,168,76,0.3))`,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700"
                    alt="Ring 360° view"
                    className="viewer360__ring-img"
                    draggable={false}
                  />
                </div>

                {/* Drag hint */}
                <div className="viewer360__hint">
                  <RotateCcw size={18} />
                  <span>Drag to rotate</span>
                </div>

                {/* Rotation indicator */}
                <div className="viewer360__indicator">
                  <div className="viewer360__indicator-bar">
                    <div
                      className="viewer360__indicator-fill"
                      style={{ width: `${(normalizedRot / 360) * 100}%` }}
                    />
                  </div>
                  <span>{Math.round(normalizedRot)}°</span>
                </div>
              </div>

              {/* Controls */}
              <div className="viewer360__controls">
                <button className="viewer360__ctrl-btn" onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}>
                  <ZoomIn size={18} />
                </button>
                <button className="viewer360__ctrl-btn" onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}>
                  <ZoomOut size={18} />
                </button>
                <div className="viewer360__ctrl-divider" />
                <button className="viewer360__ctrl-btn" onClick={handleReset}>
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="viewer360__sidebar">
              <div className="viewer360__info-card">
                <div className="section-label">Viewing</div>
                <h2 className="viewer360__product-name">
                  {id === 'new' ? 'Custom Ring' : 'Premium Diamond Ring'}
                </h2>
                <div className="gold-divider" />
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-mid)', lineHeight: 1.75 }}>
                  You are viewing a 360° interactive model. In the full version,
                  this viewer will display a photorealistic 3D GLTF ring model rendered with Three.js.
                </p>

                <div className="viewer360__tech-note">
                  <Info size={14} />
                  <span>3D architecture is ready for Three.js / GLTF integration</span>
                </div>

                <div className="viewer360__features">
                  {['Drag to rotate', 'Zoom controls', 'Reset view', 'Full 3D model ready'].map((f) => (
                    <div key={f} className="viewer360__feature-item">
                      <div className="viewer360__feature-dot" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="viewer360__actions">
                {id !== 'new' && (
                  <Link to={`/customize/${id}`} className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                    <Sparkles size={16} />
                    Customize This Ring
                  </Link>
                )}
                <Link to="/try-on" className="btn btn-ghost w-full" style={{ justifyContent: 'center', marginTop: 12 }}>
                  Try It On Virtually
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
