import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Company Info */}
      <div className="footer-section">

        <h2>
          <span className="dream">Dream</span>
          <span className="nest">Nest</span>
        </h2>

        <p>
          Premium sleep solutions designed for
          comfort, quality and better living.
        </p>

      </div>

      {/* Quick Links */}
      <div className="footer-section">

        <h3>Quick Links</h3>

        <Link to="/">Home</Link>

        <Link to="/shop">Shop</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/cart">Cart</Link>

      </div>

      {/* Categories */}
      <div className="footer-section">

        <h3>Categories</h3>

        <p>Mattresses</p>

        <p>Beds</p>

        <p>Pillows</p>

        <p>Bedroom Sets</p>

      </div>

      {/* Contact */}
      <div className="footer-section">

        <h3>Contact</h3>

        <p>📍 Lahore, Pakistan</p>

        <p>📞 +92 300 1234567</p>

        <p>✉ support@dreamnest.com</p>

      </div>

    </footer>
  );
}

export default Footer;