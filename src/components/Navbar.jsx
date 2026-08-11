import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        Dream<span>Nest</span>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/shop">Shop</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="nav-right">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />

        <Link to="/cart" className="cart-btn">
          🛒 Cart
        </Link>

        <button className="login-btn">
          Login
        </button>
      </div>

    </header>
  );
}

export default Navbar;