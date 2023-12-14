import formatDate from "../utils/formatDate";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/User";
import { deleteComment } from "../utils/api";

const Comment = ({ comment }) => {
  const { user, setUser } = useContext(UserContext);
  const [canDelete, setCanDelete] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState("");

  useEffect(() => {
    if (user.username === comment.author) {
      setCanDelete(true);
    }
  }, [canDelete]);

  const handleClick = (event) => {
    event.preventDefault();
    setDeleteStatus("Deleting comment...");
    setIsDisplaying(false);
    setCanDelete(false);
    deleteComment(comment.comment_id)
      .then(() => {
        setDeleteStatus("Comment successfully deleted!");
      })
      .catch(() => {
        setIsDisplaying(true);
        setCanDelete(true);
        setDeleteStatus("Unable to delete comment, please try again.");
      })
      .finally(() => {
        setTimeout(() => {
          setDeleteStatus("");
        }, 3000);
      });
  };

  return (
    <>
      {isDisplaying && (
        <div className="comment-list-container">
          <li className="comment-item">
            <p className="comment-body">{comment.body}</p>
            <p>Author: {comment.author}</p>
            <p>Votes: {comment.votes}</p>
            <p>Created At: {formatDate(comment.created_at)}</p>
          </li>
        </div>
      )}
      {isDisplaying && canDelete && (
        <button className="delete-comment-button" onClick={handleClick}>
          Delete comment
        </button>
      )}
      <h3>{deleteStatus}</h3>
    </>
  );
};

export default Comment;
