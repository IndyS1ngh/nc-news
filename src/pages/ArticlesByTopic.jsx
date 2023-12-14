import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ArticlesByTopicList from "../components/ArticlesByTopicList";

const ArticlesByTopic = () => {
  return (
    <main id="main" className="articles-by-topic-page">
      <Header />
      <NavBar />
      <ArticlesByTopicList />
      <Footer />
    </main>
  );
};

export default ArticlesByTopic;
