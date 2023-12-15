import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://indys-news-api.onrender.com/api",
});

export const getArticles = (sort_by, order) => {
  return newsApi
    .get(`/articles?sort_by=${sort_by}&order=${order}`)
    .then((res) => {
      return res.data.articles;
    });
};

export const getArticleById = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then((res) => {
      return res.data.article;
    })
    .catch(function (error) {
      if (error.response) {
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.msg,
        });
      }
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

export const postComment = (article_id, newCommentText) => {
  const postBody = {
    body: newCommentText,
    username: "weegembump",
  };
  return newsApi
    .post(`/articles/${article_id}/comments`, postBody)
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return newsApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const getArticlesByTopic = (topic, sort_by, order) => {
  return newsApi
    .get(`/articles?topic=${topic}&sort_by=${sort_by}&order=${order}`)
    .then((res) => {
      return res.data.articles;
    })
    .catch(function (error) {
      if (error.response) {
        return Promise.reject({
          status: error.response.status,
          message: error.response.data.msg,
        });
      }
    });
};
