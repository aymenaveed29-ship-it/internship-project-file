import "../styles/hero.css";
import HeroImage from "../assets/images/hero.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="badge">
          ⭐ Trusted by 10,000+ Happy Customers
        </div>

        <h1>
          Sleep Better,
          <br />
          Live Better.
        </h1>

        <p>
          Discover premium mattresses designed to provide
          exceptional comfort, superior support, and a healthier
          night's sleep for you and your family.
        </p>

        <div className="hero-buttons">
          <button className="shop-btn">
            Shop Now
          </button>

          <button className="learn-btn">
            Explore Collection
          </button>
        </div>

      </div>

      <div className="hero-right">

        <img
        src={HeroImage} alt="Hero" 
          alt="Bedroom"
          />
      </div>
    </section>
  );
}

export default Hero;