import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://indys-news-api.onrender.com/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsForArticle = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const addArticleVote = (article_id) => {
  const patchBody = {
    inc_votes: 1,
  };
  return newsApi.patch(`/articles/${article_id}`, patchBody).then((res) => {
    return res.data.article;
  });
};

export const deleteArticleVote = (article_id) => {
  const patchBody = {
    inc_votes: -1,
  };
  return newsApi.patch(`/articles/${article_id}`, patchBody).then((res) => {
    return res.data.article;
  });
};
