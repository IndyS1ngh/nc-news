import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleItem from "./ArticleItem";
import { useSearchParams } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortByStatus, setSortByStatus] = useState("DATE");
  const [orderStatus, setOrderStatus] = useState("DESCENDING");

  const [searchParams, setSearchParams] = useSearchParams();
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
    getArticles(sortByQuery, orderQuery)
      .then((apiArticles) => {
        setArticles(apiArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [sortByQuery, orderQuery]);

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
      <h3>
        Currently sorting ALL articles by {sortByStatus} in {orderStatus} order
      </h3>
      <ul className="article-list">
        {articles.map((article) => {
          return <ArticleItem article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
};

export default ArticleList;
