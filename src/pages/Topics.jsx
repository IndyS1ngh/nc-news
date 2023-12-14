import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TopicsList from "../components/TopicsList";

const Topics = () => {
  return (
    <main id="main" className="topics-page">
      <Header />
      <NavBar />
      <TopicsList />
      <Footer />
    </main>
  );
};

export default Topics;
