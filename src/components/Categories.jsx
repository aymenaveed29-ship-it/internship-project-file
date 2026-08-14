import "../styles/categories.css";
import { Link } from "react-router-dom";

import Mattress from "../assets/images/mattress1.jpg";
import Bedroom from "../assets/images/mattress2.jpg";
import Pillow from "../assets/images/pillow.jpg";
import Bed from "../assets/images/mattress6.jpg";

function Categories() {
  return (
    <section className="categories">

      <h2>Shop By Category</h2>

      <p>
        Find the perfect products designed to improve your sleep experience.
      </p>

      <div className="category-grid">

        <Link
          to="/shop?category=Mattress"
          className="category-card"
        >
          <img src={Mattress} alt="Mattress" />
          <h3>Mattress</h3>
        </Link>

        <Link
          to="/shop?category=Bedroom"
          className="category-card"
        >
          <img src={Bedroom} alt="Bedroom" />
          <h3>Bedroom</h3>
        </Link>

        <Link
          to="/shop?category=Pillow"
          className="category-card"
        >
          <img src={Pillow} alt="Pillow" />
          <h3>Pillow</h3>
        </Link>

        <Link
          to="/shop?category=Bed"
          className="category-card"
        >
          <img src={Bed} alt="Bed" />
          <h3>Bed</h3>
        </Link>

      </div>
    </section>
  );
}

export default Categories;