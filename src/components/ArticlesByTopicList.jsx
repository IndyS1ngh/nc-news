import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils/api";
import ArticleItem from "./ArticleItem";
import { useSearchParams } from 'react-router-dom';

const ArticlesByTopicList = () => {
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");

  useEffect(() => {
    getArticlesByTopic(topicQuery)
      .then((apiArticlesByTopic) => {
        setArticlesByTopic(apiArticlesByTopic);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topicQuery]);

  if (isLoading) {
    return <h2>Loading Articles...</h2>;
  }
  if (isError) {
    return <h2>Articles failed to load...</h2>;
  }

  return (
    <div>
      <ul className="article-list">
        {articlesByTopic.map((article) => {
          return <ArticleItem article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
};

export default ArticlesByTopicList;
