export const login = (TOKEN) => {
  localStorage.setItem("Token", TOKEN);
};

export const logout = () => {
  localStorage.removeItem("Token");
};

export const isLogin = () => {
  if (localStorage.getItem("Token")) {
    return true;
  }
  return false;
};
