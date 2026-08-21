import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/login.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await login({
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login successful!");

      const nextUrl = location.state?.from?.pathname || "/";
      navigate(nextUrl, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="login-page">
        <div className="login-card">
          <h1>Login</h1>
          <p>Sign in to complete your order</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </label>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login to Order"}
            </button>
          </form>

          <p className="login-footer">
            Need an account? <Link to="/">Continue shopping</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LoginPage;
