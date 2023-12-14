import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils/api";
import ArticleItem from "./ArticleItem";
import { useSearchParams } from "react-router-dom";

const ArticlesByTopicList = () => {
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by") || "created_at";
  const orderQuery = searchParams.get("order") || "desc";

  const setSortByCriteria = (attribute) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", attribute);
    setSearchParams(newParams);
  };

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  useEffect(() => {
    getArticlesByTopic(topicQuery, sortByQuery, orderQuery)
      .then((apiArticlesByTopic) => {
        setArticlesByTopic(apiArticlesByTopic);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [topicQuery, sortByQuery, orderQuery]);

  if (isLoading) {
    return <h2>Loading Articles...</h2>;
  }
  if (isError) {
    return <h2>Articles failed to load...</h2>;
  }

  return (
    <div>
      <button onClick={() => setSortOrder("asc")}>Ascending</button>
      <button onClick={() => setSortOrder("desc")}>Descending</button>
      <button onClick={() => setSortByCriteria("created_at")}>
        Sort by date
      </button>
      <button onClick={() => setSortByCriteria("votes")}>Sort by votes</button>
      <button onClick={() => setSortByCriteria("comment_count")}>
        Sort by comment count
      </button>
      <ul className="article-list">
        {articlesByTopic.map((article) => {
          return <ArticleItem article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
};

export default ArticlesByTopicList;
