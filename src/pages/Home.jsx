import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Whychooseus from "../components/Whychooseus";

function Home () {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Whychooseus />
    </>
  );
};

export default Home;