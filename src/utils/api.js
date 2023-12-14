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

export const postComment = (article_id, newCommentText) => {
  const postBody = {
    body: newCommentText,

    //TODO - needs to be dynamic
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
