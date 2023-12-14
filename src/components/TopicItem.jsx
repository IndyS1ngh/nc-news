import { Link } from "react-router-dom";

const TopicItem = ({ topic }) => {
  return (
    <div className="topic-item-container">
      <Link
        to={"/articles?topic=" + topic.slug}
        className="topics-page-topic-links"
      >
        <li className="topic-item">
          <h2>{topic.slug}</h2>
          <div className="topic-info">
            <p>Description: {topic.description}</p>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default TopicItem;
