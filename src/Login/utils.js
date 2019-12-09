export const fetchTokenFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || null;
};
