import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleItem from "./ArticleItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((apiArticles) => {
        setArticles(apiArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <div>
      <button className="filter-by-topic">Filter by Topic</button>
      <ul className="article-list">
        {articles.map((article) => {
          return <ArticleItem article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
