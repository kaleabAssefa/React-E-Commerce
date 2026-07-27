import './ProductList.css'

function ProductList({ products, onSelectProduct }) {
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

      <div className="product-list__grid">
        {products.map((product) => (
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
