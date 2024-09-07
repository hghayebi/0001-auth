const paths = {
  home() {
    return "/";
  },

  login() {
    return "/auth/login";
  },

  register() {
    return "/auth/register";
  },

  defaultLoginRedirect() {
    return "/settings";
  },
};

export default paths;
