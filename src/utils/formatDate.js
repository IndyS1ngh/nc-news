function formatDate(created_at) {
  const date = new Date(created_at);
  return date.toUTCString();
}

export default formatDate;
