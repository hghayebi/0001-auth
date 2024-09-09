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
  newVerification() {
    return "/auth/new-verification";
  },
};

export default paths;
