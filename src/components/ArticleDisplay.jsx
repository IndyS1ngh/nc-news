import { useEffect, useState } from "react";
import {
  addArticleVote,
  deleteArticleVote,
  getArticleById,
} from "../utils/api";
import Article from "./Article";
import Error from "./Error";

const ArticleDisplay = ({ article_id }) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVoteError, setIsVoteError] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((apiArticle) => {
        setArticle(apiArticle);
        setIsLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, []);

  const upVote = (article_id) => {
    setArticle((currArticle) => {
      return { ...currArticle, votes: currArticle.votes + 1 };
    });
    setIsVoteError(false);
    addArticleVote(article_id).catch(() => {
      setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes - 1 };
      });
      setIsVoteError(true);
    });
  };

  const downVote = (article_id) => {
    setArticle((currArticle) => {
      return { ...currArticle, votes: currArticle.votes - 1 };
    });
    setIsVoteError(false);
    deleteArticleVote(article_id).catch(() => {
      setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes + 1 };
      });
      setIsVoteError(true);
    });
  };

  if (isLoading) {
    return <h2>Loading Article...</h2>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  } else {
    return (
      <div>
        <ul className="article-display">
          <Article article={article} key={article.article_id} />
        </ul>
        <button
          onClick={() => upVote(article.article_id)}
          className="upvote-button"
        >
          Upvote
        </button>
        <button
          onClick={() => downVote(article.article_id)}
          className="downvote-button"
        >
          Downvote
        </button>
        <h3>
          {isVoteError ? "Could not vote on article, please try again." : null}
        </h3>
      </div>
    );
  }
};

export default ArticleDisplay;
