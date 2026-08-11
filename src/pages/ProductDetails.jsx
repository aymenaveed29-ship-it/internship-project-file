import { useParams } from "react-router-dom";
import products from "../data/products";
import Navbar from "../components/Navbar";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="details-page">

        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">

          <h1>{product.name}</h1>

          <h3>{product.category}</h3>

          <p>
            Experience unmatched comfort with our premium
            {` ${product.name}`} designed for better sleep and
            long-lasting durability.
          </p>

          <h2>${product.price}</h2>

          <button>Add To Cart</button>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;