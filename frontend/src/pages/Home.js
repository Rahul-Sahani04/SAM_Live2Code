import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import About from "../pages/About";
import Team from "../pages/Team";
const Home = () => {
  return (
    <div className="home">
      <About />

      <Team />
      <Footer />
    </div>
  );
};

export default Home;
