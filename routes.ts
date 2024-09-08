import paths from "./paths";

export const DEFAULT_LOGIN_REDIRECT = paths.defaultLoginRedirect();

export const publicRoutes: Array<string> = [paths.home()];

export const authRoutes: Array<string> = [paths.login(), paths.register()];

export const apiAuthPrefix: string = "/api/auth";
