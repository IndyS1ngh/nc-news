import { useEffect, useState } from "react";
import { getArticleById } from "../utils/api";
import Article from "./Article";

const ArticleDisplay = ({ article_id }) => {
  const [article, setArticle] = useState({});
  //   const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((apiArticle) => {
        setArticle(apiArticle);
        setIsLoading(false);
        window.scrollTo(0, 0);
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
      <ul className="article-display">
        <Article article={article} key={article.article_id} />
      </ul>
      <button className="upvote-button">Upvote</button>
      <button className="downvote-button">Downvote</button>
    </div>
  );
};

export default ArticleDisplay;
