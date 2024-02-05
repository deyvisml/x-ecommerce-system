import "./App.css";
import Header from "../Header";
import Carousel from "../Carousel";
import Categories from "../Categories";
import Footer from "../Footer";

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <div className="mx-4 mt-5 mb-16 bg-slate-50 sm:mx-20 md:mx-52">
        <Categories />
      </div>
      <Footer />
    </>
  );
}

export default App;
