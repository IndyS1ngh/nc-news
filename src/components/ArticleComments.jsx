import { useEffect, useState } from "react";
import { getCommentsForArticle } from "../utils/api";
import Comment from "./Comment";

const ArticleComments = ({ article_id }) => {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCommentsForArticle(article_id)
      .then((apiComments) => {
        setArticleComments(apiComments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading Comments...</h2>;
  }
  if (isError) {
    return <h2>Comments failed to load...</h2>;
  }

  return (
    <div>
      <h2>Comments:</h2>
      <form>
        Add or delete a comment:
        <input placeholder="Write your comment here..."></input>
        <button className="add-button">Add</button>
        <button className="delete-button">Delete</button>
      </form>
      <ul className="comment-display">
        {articleComments.map((comment) => {
          return <Comment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </div>
  );
};

export default ArticleComments;
