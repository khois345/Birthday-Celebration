import { NextRequest, NextResponse } from "next/server";

type Locale = "en" | "vi";

const LOCALE_COOKIE = "NEXT_LOCALE";
const SUPPORTED_LOCALES: Locale[] = ["en", "vi"];

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (cookieLocale === "en" || cookieLocale === "vi") {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";

  if (acceptLanguage.includes("vi")) {
    return "vi";
  }

  return "en";
}

function pathHasLocale(pathname: string): boolean {
  return SUPPORTED_LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = getPreferredLocale(request);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}`;

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  if (pathHasLocale(pathname)) {
    const locale = pathname.startsWith("/vi") ? "vi" : "en";
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
