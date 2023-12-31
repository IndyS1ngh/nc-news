import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../utils/api";
import ArticleItem from "./ArticleItem";
import { useSearchParams } from "react-router-dom";
import Error from "./Error";

const ArticlesByTopicList = () => {
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortByStatus, setSortByStatus] = useState("DATE");
  const [orderStatus, setOrderStatus] = useState("DESCENDING");
  const [apiError, setApiError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by") || "created_at";
  const orderQuery = searchParams.get("order") || "desc";

  const setSortByCriteria = (attribute) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", attribute);
    setSearchParams(newParams);
    if (attribute === "created_at") {
      setSortByStatus("DATE");
    } else if (attribute === "votes") {
      setSortByStatus("VOTES");
    } else if (attribute === "comment_count") {
      setSortByStatus("COMMENT COUNT");
    } else {
      setSortByStatus(attribute);
    }
  };

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
    if (direction === "asc") {
      setOrderStatus("ASCENDING");
    } else if (direction === "desc") {
      setOrderStatus("DESCENDING");
    } else {
      setOrderStatus(direction);
    }
  };

  useEffect(() => {
    getArticlesByTopic(topicQuery, sortByQuery, orderQuery)
      .then((apiArticlesByTopic) => {
        setArticlesByTopic(apiArticlesByTopic);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, [topicQuery, sortByQuery, orderQuery]);

  if (isLoading) {
    return <h2>Loading Articles...</h2>;
  } else if (apiError) {
    return <Error message={"query: " + apiError.message} />;
  } else {
    return (
      <div>
        <button onClick={() => setSortOrder("asc")}>Ascending</button>
        <button onClick={() => setSortOrder("desc")}>Descending</button>
        <button onClick={() => setSortByCriteria("created_at")}>
          Sort by date
        </button>
        <button onClick={() => setSortByCriteria("votes")}>
          Sort by votes
        </button>
        <button onClick={() => setSortByCriteria("comment_count")}>
          Sort by comment count
        </button>
        <h3>
          Currently sorting {topicQuery.toUpperCase()} articles by{" "}
          {sortByStatus} in {orderStatus} order
        </h3>
        <ul className="article-list">
          {articlesByTopic.map((article) => {
            return <ArticleItem article={article} key={article.article_id} />;
          })}
        </ul>
      </div>
    );
  }
};

export default ArticlesByTopicList;
