import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ArticleList from "../components/ArticleList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="home-page">
      <Header />
      <NavBar />
      <ArticleList />
      <Footer />
    </main>
  );
};

export default Home;
