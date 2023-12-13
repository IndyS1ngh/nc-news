import formatDate from "../utils/formatDate";

const Comment = ({ comment }) => {
  return (
    <div className="comment-list-container">
      <li className="comment-item">
        <p className="comment-body">{comment.body}</p>
        <p>Author: {comment.author}</p>
        <p>Votes: {comment.votes}</p>
        <p>Created At: {formatDate(comment.created_at)}</p>
      </li>
    </div>
  );
};

export default Comment;
