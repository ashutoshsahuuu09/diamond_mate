import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import { getRings } from '../services/api';
import './Collections.css';

const COLLECTIONS = ['All', 'Solitaire', 'Halo', 'Vintage', 'Eternity'];
const METALS = ['All', '18K Gold', 'Platinum', 'Rose Gold', 'White Gold'];
const SORT_OPTIONS = [
  { value: 'created_at', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rings, setRings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    collection: searchParams.get('collection') || 'All',
    metal: 'All',
    sortBy: 'created_at',
    minPrice: '',
    maxPrice: '',
  });

  const fetchRings = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        sort_by: filters.sortBy,
        limit: 50,
      };
      if (filters.collection !== 'All') params.collection = filters.collection;
      if (filters.metal !== 'All') params.metal = filters.metal;
      if (filters.minPrice) params.min_price = Number(filters.minPrice);
      if (filters.maxPrice) params.max_price = Number(filters.maxPrice);

      const data = await getRings(params);
      setRings(data);
    } catch {
      setRings([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchRings(); }, [fetchRings]);

  useEffect(() => {
    const col = searchParams.get('collection');
    if (col) setFilters((f) => ({ ...f, collection: col }));
  }, [searchParams]);

  const setFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ collection: 'All', metal: 'All', sortBy: 'created_at', minPrice: '', maxPrice: '' });
    setSearch('');
  };

  const filtered = search
    ? rings.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.collection.toLowerCase().includes(search.toLowerCase())
      )
    : rings;

  return (
    <MainLayout>
      <div className="collections-page">
        {/* ── Page Header ── */}
        <div className="collections-header">
          <div className="container">
            <div className="section-label">Browse</div>
            <h1 className="section-title">Our Collections</h1>
            <p className="section-subtitle">
              {filtered.length} ring{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        <div className="container">
          <div className="collections-layout">
            {/* ── Sidebar Filters ── */}
            <aside className={`collections-sidebar ${showFilters ? 'open' : ''}`}>
              <div className="collections-sidebar__header">
                <h3>Filters</h3>
                <button onClick={clearFilters} className="collections-clear-btn">
                  Clear all
                </button>
              </div>

              {/* Collection */}
              <div className="filter-group">
                <div className="filter-group__label">Collection</div>
                <div className="filter-group__options">
                  {COLLECTIONS.map((c) => (
                    <button
                      key={c}
                      className={`tag ${filters.collection === c ? 'active' : ''}`}
                      onClick={() => setFilter('collection', c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal */}
              <div className="filter-group">
                <div className="filter-group__label">Metal</div>
                <div className="filter-group__options">
                  {METALS.map((m) => (
                    <button
                      key={m}
                      className={`tag ${filters.metal === m ? 'active' : ''}`}
                      onClick={() => setFilter('metal', m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <div className="filter-group__label">Price Range (₹)</div>
                <div className="filter-price">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilter('minPrice', e.target.value)}
                    className="form-input"
                  />
                  <span>—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilter('maxPrice', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="collections-main">
              {/* Toolbar */}
              <div className="collections-toolbar">
                <div className="collections-search">
                  <Search size={16} className="collections-search__icon" />
                  <input
                    type="text"
                    placeholder="Search rings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="collections-search__input"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="collections-search__clear">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="collections-toolbar__right">
                  <div className="collections-sort">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilter('sortBy', e.target.value)}
                      className="form-input"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn btn-outline btn-sm collections-filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal size={14} />
                    Filters
                  </button>
                </div>
              </div>

              {/* Collection Pills */}
              <div className="collections-pills">
                {COLLECTIONS.map((c) => (
                  <button
                    key={c}
                    className={`tag ${filters.collection === c ? 'active' : ''}`}
                    onClick={() => setFilter('collection', c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {loading ? (
                <div className="loading-center"><div className="loading-spinner" /></div>
              ) : filtered.length > 0 ? (
                <div className="collections-grid">
                  {filtered.map((ring) => (
                    <ProductCard key={ring.id} ring={ring} />
                  ))}
                </div>
              ) : (
                <div className="collections-empty">
                  <div className="collections-empty__icon">💎</div>
                  <h3>No rings found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                  <button onClick={clearFilters} className="btn btn-primary mt-16">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
