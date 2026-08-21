import { Link, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      return;
    }

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <span className="dream">Dream</span>
        <span className="nest">Nest</span>
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
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <Link to="/cart" className="cart-btn">
          🛒 Cart ({totalItems})
        </Link>

        <button className="login-btn" onClick={handleAuthClick}>
          {isAuthenticated ? `Hi, ${user?.name || "User"}` : "Login"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;