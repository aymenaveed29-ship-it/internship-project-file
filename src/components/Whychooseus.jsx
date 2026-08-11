import "../styles/whyChooseUs.css";
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Delivery",
      text: "Free shipping on all mattress orders.",
    },
    {
      icon: <FaShieldAlt />,
      title: "10-Year Warranty",
      text: "Built to last with trusted quality.",
    },
    {
      icon: <FaUndo />,
      title: "100-Night Trial",
      text: "Sleep on it before making your decision.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Our team is here whenever you need help.",
    },
  ];

  return (
    <section className="why-section">
      <h2>Why Choose DreamNest?</h2>
      <p>Everything you need for a better night's sleep.</p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;