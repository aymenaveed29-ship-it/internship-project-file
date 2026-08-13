import { Link } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
  return (
    <main className="not-found">

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link to="/" className="back-home-btn">
        Back to Home
      </Link>

    </main>
  );
}

export default NotFound;