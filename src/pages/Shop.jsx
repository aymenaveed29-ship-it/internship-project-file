import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/shop.css";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <section className="shop-page">
        <h1>Our Collection</h1>

        <p>
          Discover premium mattresses and bedroom essentials designed for
          exceptional comfort.
        </p>

        <div className="shop-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-buttons">
            <button onClick={() => setCategory("All")}>All</button>
            <button onClick={() => setCategory("Mattress")}>Mattress</button>
            <button onClick={() => setCategory("Bed")}>Bed</button>
            <button onClick={() => setCategory("Pillow")}>Pillow</button>
            <button onClick={() => setCategory("Bedroom")}>Bedroom</button>
          </div>
        </div>

        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Shop;