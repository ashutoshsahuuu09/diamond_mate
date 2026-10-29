import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Shield, CheckCircle2, Search, AlertCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { getCertificate } from '../services/api';
import './Verify.css';

const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const DEMO_CERT = {
  certificate_id: 'CERT-DM-001',
  lab: 'DiamondMate Gemological Lab (Demo)',
  report_number: 'DML-2024-001-A',
  carat: 1.0,
  cut: 'Excellent',
  color: 'G',
  clarity: 'VS1',
  polish: 'Excellent',
  symmetry: 'Excellent',
  fluorescence: 'None',
  measurements: '6.40 × 6.43 × 3.96 mm',
  issue_date: '2024-03-15',
  verified: true,
};

export default function Verify() {
  const [searchParams] = useSearchParams();
  const [certId, setCertId] = useState(searchParams.get('cert') || '');
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const certParam = searchParams.get('cert');
    if (certParam) {
      setCertId(certParam);
      fetchCert(certParam);
    }
  }, [searchParams]);

  const fetchCert = async (id) => {
    setLoading(true);
    setError(null);
    setCert(null);
    try {
      const data = await getCertificate(id);
      setCert(data);
    } catch {
      // Fallback to demo cert for demonstration
      if (id.startsWith('CERT-DM')) {
        setCert(DEMO_CERT);
      } else {
        setError('Certificate not found. Please check the ID and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (certId.trim()) fetchCert(certId.trim());
  };

  return (
    <MainLayout>
      <div className="verify page-enter">
        <div className="verify__header">
          <div className="container">
            <div className="section-label">Diamond Trust</div>
            <h1 className="verify__title">
              <Shield size={32} strokeWidth={1.5} />
              Diamond Verification
            </h1>
            <p className="verify__subtitle">
              Enter any DiamondMate certificate ID to verify the quality and authenticity of your diamond.
            </p>
          </div>
        </div>

        <div className="container">
          {/* ── Search Form ── */}
          <div className="verify__search-wrap">
            <form className="verify__search" onSubmit={handleSearch}>
              <div className="verify__search-field">
                <Search size={18} className="verify__search-icon" />
                <input
                  type="text"
                  placeholder="Enter certificate ID (e.g., CERT-DM-001)"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="verify__search-input"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading || !certId.trim()}>
                {loading ? (
                  <div className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                ) : (
                  <><Shield size={16} /> Verify</>
                )}
              </button>
            </form>
            <p className="verify__demo-hint">
              Try demo certificate: <button onClick={() => { setCertId('CERT-DM-001'); fetchCert('CERT-DM-001'); }} className="verify__demo-link">CERT-DM-001</button>
            </p>
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="verify__error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* ── Certificate Card ── */}
          {cert && (
            <div className="verify__result page-enter">
              <div className="verify__cert-card">
                {/* Header */}
                <div className="verify__cert-header">
                  <div>
                    <div className="verify__cert-lab">{cert.lab}</div>
                    <h2 className="verify__cert-id">Certificate #{cert.certificate_id}</h2>
                    <div className="verify__cert-report">Report: {cert.report_number}</div>
                  </div>
                  <div className="verify__verified-badge">
                    <CheckCircle2 size={24} />
                    <div>
                      <div className="verify__verified-text">VERIFIED</div>
                      <div className="verify__verified-sub">Quality Assured</div>
                    </div>
                  </div>
                </div>

                {/* 4Cs */}
                <div className="verify__4cs">
                  {[
                    { label: 'Carat', value: `${cert.carat} ct` },
                    { label: 'Cut', value: cert.cut },
                    { label: 'Colour', value: cert.color },
                    { label: 'Clarity', value: cert.clarity },
                  ].map((c) => (
                    <div key={c.label} className="verify__4c-item">
                      <div className="verify__4c-label">{c.label}</div>
                      <div className="verify__4c-value">{c.value}</div>
                    </div>
                  ))}
                </div>

                {/* Full Specs */}
                <div className="verify__specs-grid">
                  {[
                    ['Polish', cert.polish],
                    ['Symmetry', cert.symmetry],
                    ['Fluorescence', cert.fluorescence],
                    ['Measurements', cert.measurements],
                    ['Issue Date', cert.issue_date],
                    ['Status', cert.verified ? 'Verified ✓' : 'Pending'],
                  ].map(([label, value]) => (
                    <div key={label} className="verify__spec-row">
                      <span className="verify__spec-label">{label}</span>
                      <span className={`verify__spec-value ${label === 'Status' ? 'verify__spec-value--green' : ''}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Transparency */}
                <div className="verify__pricing">
                  <h3 className="verify__pricing-title">Transparent Pricing</h3>
                  <p className="verify__pricing-desc">
                    Here is exactly how the price of this diamond ring is calculated:
                  </p>
                  <div className="verify__pricing-rows">
                    {[
                      ['Diamond (1.0 ct, VS1, G)', 165000],
                      ['Metal (18K Gold setting)', 35000],
                      ['Setting & Craftsmanship', 0],
                      ['Base Ring', 85000],
                    ].map(([label, price]) => (
                      <div key={label} className="verify__pricing-row">
                        <span>{label}</span>
                        <span>{price > 0 ? formatPrice(price) : 'Included'}</span>
                      </div>
                    ))}
                    <div className="verify__pricing-total">
                      <span>Estimated Total</span>
                      <span className="price">{formatPrice(285000)}</span>
                    </div>
                  </div>
                </div>

                {/* Demo notice */}
                <div className="verify__demo-notice">
                  <AlertCircle size={14} />
                  <span>
                    This is a prototype certificate for demonstration purposes.
                    DiamondMate is not affiliated with GIA, IGI, or any external grading lab.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── Info section ── */}
          {!cert && !error && (
            <div className="verify__info">
              <div className="verify__info-grid">
                {[
                  { icon: '💎', title: 'The 4Cs', desc: 'Every diamond is graded on Cut, Colour, Clarity, and Carat weight — the international standard.' },
                  { icon: '📋', title: 'Certificate', desc: 'Each DiamondMate diamond ships with a quality certificate documenting every grade and measurement.' },
                  { icon: '🔍', title: 'Transparency', desc: 'We show you exactly what you are paying for. No hidden markups, no confusing pricing.' },
                  { icon: '✅', title: 'Verified', desc: 'Every ring in our collection has been quality-checked before it reaches your doorstep.' },
                ].map((info) => (
                  <div key={info.title} className="verify__info-card card">
                    <div className="verify__info-icon">{info.icon}</div>
                    <h4 className="verify__info-title">{info.title}</h4>
                    <p className="verify__info-desc">{info.desc}</p>
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
