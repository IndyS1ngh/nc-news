import { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import TopicItem from "./TopicItem";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTopics()
      .then((apiTopics) => {
        setTopics(apiTopics);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading Topics...</h2>;
  }
  if (isError) {
    return <h2>Topics failed to load...</h2>;
  }

  return (
    <div>
      <ul className="topic-list">
        {topics.map((topic) => {
          return <TopicItem topic={topic} key={topic.slug} />;
        })}
      </ul>
    </div>
  );
};

export default TopicsList;
