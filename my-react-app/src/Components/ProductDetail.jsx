import { useCart } from '../hooks/useCart.js'
import './ProductDetail.css'

function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()

  if (!product) {
    return (
      <section className="product-detail product-detail--empty">
        <p>No specimen selected.</p>
        <button className="btn btn--ghost" onClick={onBack}>
          ← Back to shop
        </button>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <button className="product-detail__back" onClick={onBack}>
        ← Back to shop
      </button>

      <div className="product-detail__layout">
        <div
          className="product-detail__swatch"
          style={{ background: product.color }}
        >
          <span className="product-detail__specimen">
            No. {product.specimen}
          </span>
        </div>

        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <p className="product-detail__price">${product.price}</p>
          <p className="product-detail__blurb">{product.blurb}</p>

          <dl className="product-detail__facts">
            <div className="product-detail__fact">
              <dt>Light</dt>
              <dd>{product.light}</dd>
            </div>
            <div className="product-detail__fact">
              <dt>Water</dt>
              <dd>{product.water}</dd>
            </div>
            <div className="product-detail__fact">
              <dt>Size</dt>
              <dd>{product.size}</dd>
            </div>
          </dl>

          <button
            className="btn btn--primary"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
