import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/site",
  "/api/uploadthing",
  "/agency/sign-in(.*)",
  "/agency/sign-up(.*)",
  "/sign-in(.*)",    // 添加公共路由
  "/sign-up(.*)",    // 添加公共路由
]);

export default clerkMiddleware((auth, request) => {
  const { userId }: { userId: string | null } = auth();
  const url = request.nextUrl;
  const searchParams = url.searchParams.toString();
  let hostname = request.headers;
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  if (isPublicRoute(request)) {
    return NextResponse.next();  // 如果是公共路由，直接跳过保护
  }

  if (!userId) {
    if (url.pathname !== "/sign-in" && url.pathname !== "/sign-up") {
      return NextResponse.redirect(new URL(`/sign-in?redirect_url=${encodeURIComponent(url.toString())}`, request.url));
    }
  }

  if (userId) {
    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const customSubDomain = hostname
      .get("host")
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, request.url)
      );
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
