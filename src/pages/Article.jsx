import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ArticleDisplay from "../components/ArticleDisplay";
import { useParams } from "react-router-dom";

const Article = () => {
  const { article_id } = useParams();

  return (
    <main className="article-page">
      <Header />
      <NavBar />
      <ArticleDisplay article_id={article_id} />
      <Footer />
    </main>
  );
};

export default Article;
