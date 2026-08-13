import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Whychooseus from "../components/Whychooseus";
import Footer from "../components/Footer";
function Home () {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Whychooseus />
      <Footer />
    </>
  );
};

export default Home;