import { useEffect, useState } from 'react'
import './ProductList.css'

function ProductList({ products, status, onSelectProduct }) {
  // Local UI-only state: what the shopper is typing/toggling right now.
  const [searchTerm, setSearchTerm] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(products)

  // Re-derive the visible list whenever the source data, the search box,
  // or the sort toggle changes — a small useEffect-driven side effect
  // rather than filtering inline in the render.
  useEffect(() => {
    let next = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    )

    if (sortByPrice) {
      next = [...next].sort((a, b) => a.price - b.price)
    }

    setVisibleProducts(next)
  }, [products, searchTerm, sortByPrice])

  return (
    <section className="product-list">
      <div className="product-list__intro">
        <p className="product-list__eyebrow">The catalog</p>
        <h1>Plants &amp; planters, cataloged</h1>
        <p className="product-list__sub">
          Six specimens, hand-picked and ready to ship. Tap any card for
          care details.
        </p>
      </div>

      <div className="product-list__controls">
        <input
          type="search"
          className="product-list__search"
          placeholder="Search the catalog…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search products"
        />

        <label className="product-list__sort">
          <input
            type="checkbox"
            checked={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.checked)}
          />
          Sort by price
        </label>
      </div>

      {status === 'loading' && (
        <p className="product-list__status">Loading the catalog…</p>
      )}

      {status === 'failed' && (
        <p className="product-list__status product-list__status--error">
          Couldn&rsquo;t load the catalog. Try refreshing.
        </p>
      )}

      {status === 'succeeded' && visibleProducts.length === 0 && (
        <p className="product-list__status">
          No specimens match &ldquo;{searchTerm}&rdquo;.
        </p>
      )}

      <div className="product-list__grid">
        {visibleProducts.map((product) => (
          <button
            key={product.id}
            className="product-card"
            onClick={() => onSelectProduct(product.id)}
          >
            <div
              className="product-card__swatch"
              style={{ background: product.color }}
            >
              <span className="product-card__specimen">
                {product.specimen}
              </span>
            </div>
            <div className="product-card__body">
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__price">${product.price}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ProductList
