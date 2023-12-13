import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const ArticleItem = ({ article }) => {
  return (
    <div className="article-item-container">
      <Link
        to={"/articles/" + article.article_id}
        className="home-page-article-links"
      >
        <li className="article-item">
          <h2>{article.title}</h2>
          <img
            className="article-item-img"
            src={article.article_img_url}
            alt={article.title + " img"}
          />
          <div className="article-info">
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Created At: {formatDate(article.created_at)}</p>
            <p>Votes: {article.votes}</p>
            <p>Comment Count: {article.comment_count}</p>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default ArticleItem;
