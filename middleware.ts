import { NextRequest, NextResponse } from "next/server";

type Locale = "en" | "vi" | "zh" | "ko" | "ja" | "es" | "id" | "th";

const LOCALE_COOKIE = "NEXT_LOCALE";
const SUPPORTED_LOCALES: Locale[] = ["en", "vi", "zh", "ko", "ja", "es", "id", "th"];

function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";

  if (acceptLanguage.includes("vi")) {
    return "vi";
  }

  if (acceptLanguage.includes("zh")) {
    return "zh";
  }

  if (acceptLanguage.includes("ko")) {
    return "ko";
  }

  if (acceptLanguage.includes("ja")) {
    return "ja";
  }

  if (acceptLanguage.includes("es")) {
    return "es";
  }

  if (acceptLanguage.includes("id")) {
    return "id";
  }

  if (acceptLanguage.includes("th")) {
    return "th";
  }

  return "en";
}

function pathHasLocale(pathname: string): boolean {
  // English has no prefix, so exclude it from locale path matching
  const nonEnglishLocales = SUPPORTED_LOCALES.filter((locale) => locale !== "en");
  return nonEnglishLocales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const locale = getPreferredLocale(request);
    
    // For English (default), just set the cookie and continue
    if (locale === "en") {
      const response = NextResponse.next();
      response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
      return response;
    }
    
    // For other locales, redirect to /{locale}
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}`;

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  if (pathHasLocale(pathname)) {
    const localeSegment = pathname.split("/")[1];
    const locale = isLocale(localeSegment) ? localeSegment : "en";
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  // For routes without a locale prefix, set English as the default locale
  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, "en", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return response

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
