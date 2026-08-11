import "../styles/navbar.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
    <span className="dream">Dream</span>
    <span className="nest">Nest</span>
</div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Mattresses</a></li>
        <li><a href="#">Bedroom</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="nav-right">

  <div className="search-box">
    <FaSearch className="search-icon" />
    <input
      type="text"
      placeholder="Search..."
    />
  </div>

  <div className="cart">
    <FaShoppingCart className="icon" />
    <span className="cart-count">0</span>
  </div>

  <button className="login-btn">
    Login
  </button>

</div>

    </nav>
  );
}

export default Navbar;