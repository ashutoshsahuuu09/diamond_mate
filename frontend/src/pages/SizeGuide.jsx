import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import './SizeGuide.css';

const SIZES = [
  { us: 5,    diameter: 15.7, circumference: 49.3 },
  { us: 5.5,  diameter: 16.1, circumference: 50.6 },
  { us: 6,    diameter: 16.5, circumference: 51.9 },
  { us: 6.5,  diameter: 16.9, circumference: 53.1 },
  { us: 7,    diameter: 17.3, circumference: 54.4 },
  { us: 7.5,  diameter: 17.7, circumference: 55.7 },
  { us: 8,    diameter: 18.2, circumference: 57.2 },
  { us: 8.5,  diameter: 18.6, circumference: 58.4 },
  { us: 9,    diameter: 19.0, circumference: 59.7 },
  { us: 9.5,  diameter: 19.4, circumference: 61.0 },
  { us: 10,   diameter: 19.8, circumference: 62.2 },
  { us: 11,   diameter: 20.6, circumference: 64.7 },
];

const METHODS = [
  {
    icon: '📏',
    title: 'String Method',
    steps: [
      'Cut a thin strip of paper or string',
      'Wrap it around the base of your finger',
      'Mark where the paper meets',
      'Measure the length in mm',
      'Match to the circumference in the table',
    ],
  },
  {
    icon: '💍',
    title: 'Existing Ring',
    steps: [
      'Take a ring that already fits well',
      'Place it on a ruler',
      'Measure the inner diameter in mm',
      'Match to the diameter column below',
    ],
  },
];

export default function SizeGuide() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [circumference, setCircumference] = useState('');

  const recommended = circumference
    ? SIZES.find((s) => Math.abs(s.circumference - parseFloat(circumference)) < 1.5)
    : null;

  return (
    <MainLayout>
      <div className="size-guide page-enter">
        <div className="size-guide__header">
          <div className="container">
            <div className="section-label">Ring Fitting</div>
            <h1 className="size-guide__title">Ring Size Guide</h1>
            <p className="size-guide__subtitle">
              Finding the right size is easier than you think. Use one of our methods below.
            </p>
          </div>
        </div>

        <div className="container">
          {/* ── Methods ── */}
          <div className="size-guide__methods">
            {METHODS.map((m) => (
              <div key={m.title} className="size-guide__method card">
                <div className="size-guide__method-icon">{m.icon}</div>
                <h3 className="size-guide__method-title">{m.title}</h3>
                <ol className="size-guide__method-steps">
                  {m.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          {/* ── Estimator ── */}
          <div className="size-guide__estimator">
            <h2 className="size-guide__section-title">Find Your Size</h2>
            <div className="size-guide__estimator-form">
              <label className="form-label">Enter finger circumference (mm)</label>
              <div className="size-guide__input-row">
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g., 54.4"
                  value={circumference}
                  onChange={(e) => setCircumference(e.target.value)}
                  style={{ maxWidth: 200 }}
                />
                {recommended && (
                  <div className="size-guide__result">
                    <span>Your size:</span>
                    <strong>US {recommended.us}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Size Table ── */}
          <div className="size-guide__table-wrap">
            <h2 className="size-guide__section-title">International Size Chart</h2>
            <div className="size-guide__table">
              <div className="size-guide__table-header">
                <span>US Size</span>
                <span>Diameter (mm)</span>
                <span>Circumference (mm)</span>
                <span>Select</span>
              </div>
              {SIZES.map((s) => (
                <div
                  key={s.us}
                  className={`size-guide__table-row ${selectedSize === s.us ? 'selected' : ''} ${recommended?.us === s.us ? 'recommended' : ''}`}
                  onClick={() => setSelectedSize(s.us)}
                >
                  <span className="size-guide__us-size">US {s.us}</span>
                  <span>{s.diameter} mm</span>
                  <span>{s.circumference} mm</span>
                  <span>
                    {recommended?.us === s.us && <span className="size-guide__rec-badge">Recommended</span>}
                    {selectedSize === s.us && recommended?.us !== s.us && <span className="size-guide__sel-badge">Selected</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tips ── */}
          <div className="size-guide__tips">
            <h3>💡 Tips</h3>
            <ul>
              <li>Fingers are typically larger in the evening — measure then for accuracy</li>
              <li>Cold fingers can be a half-size smaller</li>
              <li>If between sizes, go with the larger size</li>
              <li>DiamondMate offers free resizing within 30 days of purchase</li>
            </ul>
          </div>

          {selectedSize && (
            <div className="size-guide__cta">
              <h3>Shop rings in size {selectedSize}</h3>
              <Link to="/collections" className="btn btn-primary">
                Browse Collections
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
