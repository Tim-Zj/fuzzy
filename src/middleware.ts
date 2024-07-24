//C:\Users\19892\Desktop\automation\src\middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher([
  "/",
  "/site",
  "/api/uploadthing",
  "/agency/sign-in(.*)",
  "/agency/sign-up(.*)",
]);

export default clerkMiddleware((auth, request) => {
  const { userId }: { userId: string | null } = auth();
  const url = request.nextUrl;
  const searchParams = url.searchParams.toString();
  let hostname = request.headers;
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // if (!userId || userId) {
  //   if (
  //     url.pathname === "/" ||
  //     (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  //   ) {
  //     return NextResponse.rewrite(new URL("/site", request.url));
  //   }
  // }
  if (!isPublicRoute(request)) auth().protect();
  // get the user Clerk user ID
  if (userId) {
    //if subdomain exists
    const customSubDomain = hostname
      .get("host")
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url)
      );
    }

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL(`/agency/sign-in`, request.url));
    }
    if (
      url.pathname.startsWith("/agency") ||
      url.pathname.startsWith("/subaccount")
    ) {
      return NextResponse.rewrite(
        new URL(`${pathWithSearchParams}`, request.url)
      );
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
