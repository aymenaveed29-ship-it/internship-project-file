import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import productImages from "../data/productImages";

import "../styles/productdetails.css";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:3000/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Product fetch error:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="product-details-message">
          <h2>Loading product...</h2>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <div className="product-details-message">
          <h2>Product Not Found</h2>

          <p>
            The product you are looking for does not exist.
          </p>

          <Link
            to="/shop"
            className="continue-shopping-btn"
          >
            Back to Shop
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="product-details">

        <div className="details-image">
          <img
            src={productImages[product.image]}
            alt={product.name}
          />
        </div>

        <div className="details-info">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="rating">
            ⭐ {product.rating}
          </p>

          <h2>${product.price}</h2>

          <p className="description">
            Experience premium comfort with our
            high-quality product designed for deep
            sleep, excellent support, and
            long-lasting durability.
          </p>

          <h3>Features</h3>

          <ul>
            <li>✔ Premium Quality</li>
            <li>✔ Breathable Fabric</li>
            <li>✔ Long-Lasting Durability</li>
            <li>✔ Free Delivery</li>
          </ul>

          <div className="details-buttons">

            <button
              className="details-cart-btn"
              onClick={() => addToCart(product)}
            >
              🛒 Add To Cart
            </button>

            <Link
              to="/checkout"
              className="buy-btn"
            >
              ⚡ Buy Now
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ProductDetails;