import "../styles/categories.css";
import {
  FaBed,
  FaCouch,
  FaMoon,
  FaHome
} from "react-icons/fa";

function Categories() {
  return (
    <section className="categories">

      <h2>Shop By Category</h2>

      <p>
        Find the perfect products designed to improve your sleep experience.
      </p>

      <div className="category-grid">

        <div className="category-card">
          <FaBed className="category-icon" />
          <h3>Mattresses</h3>
          <span>12 Products</span>
        </div>

        <div className="category-card">
          <FaMoon className="category-icon" />
          <h3>Luxury Beds</h3>
          <span>8 Products</span>
        </div>

        <div className="category-card">
          <FaHome className="category-icon" />
          <h3>Pillows</h3>
          <span>15 Products</span>
        </div>

        <div className="category-card">
          <FaCouch className="category-icon" />
          <h3>Bedroom Furniture</h3>
          <span>10 Products</span>
        </div>

      </div>

    </section>
  );
}

export default Categories;