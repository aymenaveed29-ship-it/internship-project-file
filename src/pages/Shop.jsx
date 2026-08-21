import { useState, useEffect, useMemo,} from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import "../styles/shop.css";

function Shop() {
  // Reads category from the URL.
  const [searchParams, setSearchParams] = useSearchParams();

  // Search entered by the user.
  const [search, setSearch] = useState("");

  // Category selected by the user.
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  // Products received from the NestJS API.
  const [shopProducts, setShopProducts] = useState([]);

  // Controls the loading message.
  const [loading, setLoading] = useState(true);

  // Stores an API error if the request fails.
  const [error, setError] = useState("");

  // Fetch products from NestJS

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        // Start loading.
        setLoading(true);

        // Clear previous error.
        setError("");

        // Request products from our NestJS backend.
        const response = await fetch(
          "http://localhost:3000/products"
        );

        // Check whether the server responded successfully.
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to load products (${response.status}): ${errorText || "Unknown server error"}`
          );
        }

        // Convert JSON response into JavaScript data.
        const data = await response.json();

        // Store API products in React state.
        setShopProducts(data);

      } catch (error) {

        console.error("Product fetch error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load products. Please try again."
        );

      } finally {

        // Runs whether request succeeds or fails.
        setLoading(false);
      }
    };


    fetchProducts();

  }, []);

  // Filter Products

  const filteredProducts = useMemo(() => {

    return shopProducts.filter((product) => {

      const matchesCategory =
        category === "All" ||
        product.category.toLowerCase() ===
          category.toLowerCase();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });

  }, [
    shopProducts,
    search,
    category,
  ]);

  // Change Category

  const handleCategoryChange = (newCategory) => {

    setCategory(newCategory);
    if (newCategory === "All") {

      setSearchParams({});

    } else {

      setSearchParams({
        category: newCategory,
      });
    }
  };
  // JSX

  return (
    <>
      <Navbar />

      <section className="shop-page">

        <h1>Our Collection</h1>

        <p>
          Discover premium mattresses and
          bedroom essentials designed for
          exceptional comfort.
        </p>


        {/* Search + Filters */}

        <div className="shop-controls">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <div className="filter-buttons">

            <button
              onClick={() =>
                handleCategoryChange("All")
              }
            >
              All
            </button>

            <button
              onClick={() =>
                handleCategoryChange("Mattress")
              }
            >
              Mattress
            </button>

            <button
              onClick={() =>
                handleCategoryChange("Bed")
              }
            >
              Bed
            </button>

            <button
              onClick={() =>
                handleCategoryChange("Pillow")
              }
            >
              Pillow
            </button>

            <button
              onClick={() =>
                handleCategoryChange("Bedroom")
              }
            >
              Bedroom
            </button>

          </div>

        </div>


        {/* Loading State */}

        {loading && (

          <div className="loading-message">
            Loading products...
          </div>

        )}


        {/* API Error */}

        {!loading && error && (

          <div className="no-products">

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* Products */}

        {!loading &&
          !error && (

            <div className="shop-grid">

              {filteredProducts.length > 0 ? (

                filteredProducts.map(
                  (product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                    />

                  )
                )

              ) : (

                <div className="no-products">

                  <h2>
                    No products found
                  </h2>

                  <p>
                    Try another search
                    or category.
                  </p>

                </div>

              )}

            </div>
          )}

      </section>
    </>
  );
}

export default Shop;