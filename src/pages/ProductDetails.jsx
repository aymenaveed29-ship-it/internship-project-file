// React Router hook to get the product ID from the URL
import { useParams } from "react-router-dom";

// Context allows us to use the Add to Cart function
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Import product data
import products from "../data/products";

// Import Navbar
import Navbar from "../components/Navbar";
import "../styles/productdetails.css";

function ProductDetails() {

  // Get product id from URL (example: /product/1)
  const { id } = useParams();

  // Find the matching product
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Get Add to Cart function from Context
  const { addToCart } = useContext(CartContext);

  // If user enters wrong URL
  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Product Not Found
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="product-details">

        {/* Product Image */}
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="details-info">

          <h1>{product.name}</h1>

          <p className="rating">
            ⭐ {product.rating}
          </p>

          <h2>${product.price}</h2>

          <p className="description">
            Experience premium comfort with our high-quality
            mattress designed for deep sleep, excellent
            spinal support, and long-lasting durability.
          </p>

          <h3>Features</h3>

          <ul>
            <li>✔ Premium Memory Foam</li>
            <li>✔ Breathable Fabric</li>
            <li>✔ 10-Year Warranty</li>
            <li>✔ Free Delivery</li>
          </ul>

        

    //Action Buttons
<div className="details-buttons">

  {/* Add product into cart */}
  <button
    className="details-cart-btn"
    onClick={() => addToCart(product)}
  >
    🛒 Add To Cart
  </button>

  {/* Buy Now Button */}
  <button
    className="buy-btn"
    onClick={() =>
      alert("Checkout page coming soon!")
    }
  >
    ⚡ Buy Now
  </button>

</div>

        </div>

      </section>

    </>
  );
}

export default ProductDetails;