// React hook for handling form data
import { useState } from "react";

// Common components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// CSS
import "../styles/contact.css";

function Contact() {

  // Store all form values in one object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Runs whenever the user types
  const handleChange = (e) => {

    setFormData({
      ...formData,

      // Update only the field being edited
      [e.target.name]: e.target.value,
    });

  };

  // Runs when the form is submitted
  const handleSubmit = (e) => {

    // Prevent page refresh
    e.preventDefault();

    alert("Message sent successfully!");

    // Clear the form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  };

  return (
    <>

      <Navbar />

      <section className="contact-page">

        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you.
          Feel free to contact us anytime.
        </p>

        <div className="contact-container">

          {/* ================= Form ================= */}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">
              Send Message
            </button>

          </form>

          {/* ================= Contact Info ================= */}

          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p>📍 Lahore, Pakistan</p>

            <p>📞 +92 300 1234567</p>

            <p>✉ support@dreamnest.com</p>

            <p>🕒 Monday - Saturday</p>

            <p>9:00 AM - 6:00 PM</p>

          </div>

        </div>

        {/* Google Map Placeholder */}

        <div className="map-placeholder">

          Google Map Placeholder

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Contact;