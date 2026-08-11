import "../styles/productCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <h2>${product.price}</h2>

        <div className="product-buttons">

          <button className="details-btn">
            View Details
          </button>

          <button className="cart-btn">
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;