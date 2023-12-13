import { useEffect, useState } from "react";
import { getCommentsForArticle, postComment } from "../utils/api";
import Comment from "./Comment";

const ArticleComments = ({ article_id }) => {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (canSubmit) {
      setCanSubmit(false);
      setPostStatus("Posting comment...");
      postComment(article_id, newComment)
        .then((apiComment) => {
          setNewComment("");
          setArticleComments((currComments) => {
            return [apiComment, ...currComments];
          });
          setPostStatus("Comment successfully posted!");
        })
        .catch(() => {
          setPostStatus("Unable to post comment, please try again.");
        })
        .finally(() => {
          setTimeout(() => {
            setPostStatus("");
            setCanSubmit(true);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Comments:</h2>
      <form className="add-comment-form" onSubmit={handleSubmit}>
        <label htmlFor="newComment">Add a comment:</label>
        <textarea
          className="comment-input-box"
          id="newComment"
          multiline="true"
          value={newComment}
          placeholder="Write your comment here..."
          onChange={(event) => setNewComment(event.target.value)}
          required
        ></textarea>
        <button className="add-comment-button">Add!</button>
      </form>
      <h3>{postStatus}</h3>
      <ul className="comment-display">
        {articleComments.map((comment) => {
          return <Comment comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </div>
  );
};

export default ArticleComments;
