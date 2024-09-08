import { NextResponse } from "next/server";
import { auth } from "./auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";
import paths from "./paths";

export default auth((req) => {
  const isLoggedIn: boolean = !!req.auth;

  console.log({ isLoggedIn });

  const isPublicRoute: boolean = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute: boolean = authRoutes.includes(req.nextUrl.pathname);
  const isApiAuthRoute: boolean =
    req.nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isPublicRoute) return;
  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl),
      );
    }
    return;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(paths.login(), req.nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
