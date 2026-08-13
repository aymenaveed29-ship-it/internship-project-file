// React Hooks
// useState -> manages search, category and loading state
// useEffect -> simulates loading products and handles cleanup
// useMemo -> efficiently calculates filtered products
import { useState, useEffect, useMemo } from "react";
// Components
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/shop.css";
// Shop Component

function Shop() {
  // Search state
  // Stores whatever the user types
  const [search, setSearch] = useState("");
  // Category state
  // Keeps track of selected category
  const [category, setCategory] = useState("All");

  // Products state
  // Initially empty because we simulate loading products from an API
  const [shopProducts, setShopProducts] = useState([]);
 
  // Loading state
  // true  -> show "Loading products..."
  // false -> show product cards

  const [loading, setLoading] = useState(true);
  // useEffect
  useEffect(() => {

    // Start loading
    setLoading(true);
    // ------------------------------------------------
    // Simulate an API/network request.
    // In the future, this setTimeout can be replaced
    // with fetch() when we connect the backend.
    // ------------------------------------------------
    const timer = setTimeout(() => {

      // Pretend the server returned the products
      setShopProducts(products);

      // Loading is finished
      setLoading(false);

    }, 1000);
    // CLEANUP FUNCTION
    // If the user leaves the Shop page before the timer finishes, clear the timer.

    return () => {
      clearTimeout(timer);
    };
    // Empty dependency array means:
    // Run this effect once when Shop mounts.
  }, []);
  // useMemo
 
  const filteredProducts = useMemo(() => {

    return shopProducts.filter((product) => {

      // Check selected category
      const matchesCategory =
        category === "All" ||
        product.category === category;


      // Check search text
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());


      // Product must satisfy BOTH conditions
      return matchesCategory && matchesSearch;

    });

  }, [shopProducts, search, category]);


  // ========================================
  // JSX
  // ========================================

  return (
    <>
      {/* Navbar appears at the top */}
      <Navbar />


      <section className="shop-page">

        {/* ==================================
            Page Heading
        ================================== */}

        <h1>Our Collection</h1>

        <p>
          Discover premium mattresses and bedroom
          essentials designed for exceptional comfort.
        </p>


        {/* ==================================
            Search + Filter Controls
        ================================== */}

        <div className="shop-controls">

          {/* Search Input */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}

            // Update search state whenever
            // the user types
            onChange={(e) => setSearch(e.target.value)}
          />


          {/* Category Buttons */}

          <div className="filter-buttons">

            <button
              onClick={() => setCategory("All")}
            >
              All
            </button>


            <button
              onClick={() => setCategory("Mattress")}
            >
              Mattress
            </button>


            <button
              onClick={() => setCategory("Bed")}
            >
              Bed
            </button>


            <button
              onClick={() => setCategory("Pillow")}
            >
              Pillow
            </button>


            <button
              onClick={() => setCategory("Bedroom")}
            >
              Bedroom
            </button>

          </div>

        </div>


        {/* ==================================
            Product Display
        ================================== */}

        {loading ? (

          // ----------------------------------
          // Show this while products load
          // ----------------------------------

          <div className="loading-message">
            Loading products...
          </div>

        ) : (

          // ----------------------------------
          // Show products after loading
          // ----------------------------------

          <div className="shop-grid">

            {filteredProducts.length > 0 ? (

              // Display matching products
              filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            ) : (

              // Show this when search/filter
              // returns no products
              <div className="no-products">

                <h2>No products found</h2>

                <p>
                  Try another search or category.
                </p>

              </div>

            )}

          </div>

        )}

      </section>
    </>
  );
}


// Export component so App/Router can use it
export default Shop;