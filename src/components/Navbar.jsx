import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  // Total number of items in cart
  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="dream">Dream</span>
        <span className="nest">Nest</span>
      </div>

      {/* Navigation Links */}
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

      {/* Right Side */}
      <div className="nav-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <Link to="/cart" className="cart-btn">
          🛒 Cart ({totalItems})
        </Link>

        <button className="login-btn">
          Login
        </button>
      </div>
    </header>
  );
}

export default Navbar;