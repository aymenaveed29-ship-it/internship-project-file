import "../styles/productcard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import productImages from "../data/productImages";

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);
  return (
    <div className="product-card">

      <div className="product-image">
        <img src={productImages[product.image]} alt={product.name}
/>
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

          <Link
  to={`/product/${product.id}`}
  className="details-btn"
>
  View Details
</Link>

<button
  className="cart-btn"
  onClick={() => {
    addToCart(product);

    toast.success("Item added to cart successfully!");
  }}
>
  Add To Cart
</button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;