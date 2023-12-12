import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleItem from "./ArticleItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((apiArticles) => {
        setArticles(apiArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul className="article-list">
      <button className="filter-by-topic">Filter by Topic</button>
      {articles.map((article) => {
        return <ArticleItem article={article} key={article.article_id} />;
      })}
    </ul>
  );
};

export default ArticleList;
