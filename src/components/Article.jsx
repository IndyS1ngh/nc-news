import formatDate from "../utils/formatDate";

const Article = ({ article }) => {
  return (
    <div className="article-display-container">
      <li className="article-item">
        <h2>{article.title}</h2>
        <img
          className="article-item-img"
          src={article.article_img_url}
          alt={article.title + " img"}
        />
        <div className="article-info">
          <p className="article-body">{article.body}</p>
          <p>Topic: {article.topic}</p>
          <p>Author: {article.author}</p>
          <p>Created At: {formatDate(article.created_at)}</p>
          <p>Votes: {article.votes}</p>
          <p>Comment Count: {article.comment_count}</p>
        </div>
      </li>
    </div>
  );
};

export default Article;
