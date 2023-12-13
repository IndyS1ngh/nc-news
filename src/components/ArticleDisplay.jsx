import { useEffect, useState } from "react";
import {
  addArticleVote,
  deleteArticleVote,
  getArticleById,
} from "../utils/api";
import Article from "./Article";

const ArticleDisplay = ({ article_id }) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpVoteError, setIsUpVoteError] = useState(false);
  const [isDownVoteError, setIsDownVoteError] = useState(false);

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

  const upVote = (article_id) => {
    addArticleVote(article_id)
      .then(() => {
        setIsUpVoteError(false);
      })
      .catch(() => {
        setIsUpVoteError(true);
      });

    if (!isUpVoteError) {
      setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes + 1 };
      });
    }
  };

  const downVote = (article_id) => {
    deleteArticleVote(article_id)
      .then(() => {
        setIsDownVoteError(false);
      })
      .catch(() => {
        setIsDownVoteError(true);
      });

    if (!isDownVoteError) {
      setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes - 1 };
      });
    }
  };

  if (isLoading) {
    return <h2>Loading Article...</h2>;
  }
  if (isError) {
    return <h2>Article failed to load...</h2>;
  }

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
      <p>{isUpVoteError ? "Could not upvote comment!" : ""}</p>
      <p>{isDownVoteError ? "Could not downvote comment!" : ""}</p>
    </div>
  );
};

export default ArticleDisplay;
