import { useState } from 'react';
import { Camera, Info, Smartphone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import './TryOn.css';

const STEPS = [
  { num: 1, text: 'Click "Start Try-On" and allow camera access' },
  { num: 2, text: 'Hold your hand up, palm facing you' },
  { num: 3, text: 'Position your ring finger in the frame' },
  { num: 4, text: 'See the ring appear on your finger in real time' },
];

export default function TryOn() {
  const [cameraState, setCameraState] = useState('idle'); // idle | requesting | active | denied
  const [estimatedSize, setEstimatedSize] = useState(null);

  const handleStart = async () => {
    setCameraState('requesting');
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraState('active');
      setTimeout(() => setEstimatedSize(7), 2500);
    } catch {
      setCameraState('denied');
    }
  };

  return (
    <MainLayout>
      <div className="tryon page-enter">
        <div className="tryon__header">
          <div className="container">
            <div className="section-label">AR Feature</div>
            <h1 className="tryon__title">Virtual Try-On</h1>
            <p className="tryon__subtitle">
              See how the ring looks on your finger before you buy. No commitment required.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="tryon__layout">
            {/* ── Camera Preview ── */}
            <div className="tryon__preview">
              <div className={`tryon__camera-box tryon__camera-box--${cameraState}`}>
                {cameraState === 'idle' && (
                  <div className="tryon__idle">
                    <div className="tryon__camera-icon">
                      <Camera size={48} strokeWidth={1.2} />
                    </div>
                    <h3>Camera not started</h3>
                    <p>Click "Start Try-On" to begin your virtual experience</p>
                  </div>
                )}

                {cameraState === 'requesting' && (
                  <div className="tryon__requesting">
                    <div className="loading-spinner" style={{ width: 40, height: 40 }} />
                    <p>Requesting camera access...</p>
                  </div>
                )}

                {cameraState === 'active' && (
                  <div className="tryon__active">
                    <div className="tryon__ring-overlay">
                      <img
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300"
                        alt="Ring overlay"
                        className="tryon__ring-overlay-img"
                      />
                    </div>
                    <div className="tryon__scan-line" />
                    <div className="tryon__ar-label">AR Mode Active</div>
                    <div className="tryon__hand-guide">
                      <div className="tryon__hand-frame" />
                    </div>
                    {estimatedSize && (
                      <div className="tryon__size-badge">
                        <span>Estimated Size</span>
                        <strong>{estimatedSize}</strong>
                      </div>
                    )}
                  </div>
                )}

                {cameraState === 'denied' && (
                  <div className="tryon__denied">
                    <Info size={36} />
                    <h3>Camera access denied</h3>
                    <p>Please allow camera access in your browser settings and try again.</p>
                    <button className="btn btn-ghost mt-16" onClick={() => setCameraState('idle')}>
                      Try Again
                    </button>
                  </div>
                )}
              </div>

              <button
                className={`btn btn-primary btn-lg tryon__start-btn ${cameraState === 'active' ? 'active' : ''}`}
                onClick={cameraState === 'active' ? () => setCameraState('idle') : handleStart}
                disabled={cameraState === 'requesting'}
              >
                <Camera size={18} />
                {cameraState === 'active' ? 'Stop Camera' : 'Start Try-On'}
              </button>
            </div>

            {/* ── Instructions ── */}
            <div className="tryon__sidebar">
              <div className="tryon__card">
                <h3 className="tryon__card-title">How It Works</h3>
                <div className="tryon__steps">
                  {STEPS.map((s) => (
                    <div key={s.num} className="tryon__step">
                      <div className="tryon__step-num">{s.num}</div>
                      <p className="tryon__step-text">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tryon__card tryon__ar-note">
                <div className="tryon__ar-note-icon"><Smartphone size={24} /></div>
                <h4>Full AR Experience</h4>
                <p>
                  The full AR try-on uses computer vision to detect your hand and finger,
                  then overlays the 3D ring model in real time. This architecture is ready
                  for MediaPipe or TensorFlow.js integration.
                </p>
              </div>

              {estimatedSize && (
                <div className="tryon__size-card">
                  <div className="section-label">Estimated Ring Size</div>
                  <div className="tryon__size-display">{estimatedSize}</div>
                  <p>Based on your hand proportions. Visit our <Link to="/size-guide" style={{ color: 'var(--gold)' }}>size guide</Link> to confirm.</p>
                  <Link to="/collections" className="btn btn-primary mt-16" style={{ width: '100%', justifyContent: 'center' }}>
                    <Sparkles size={16} /> Shop Size {estimatedSize}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
