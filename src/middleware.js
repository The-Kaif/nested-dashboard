import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

const authPages = ["/login", "/signup"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if code is running in the browser (client-side)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("authenticated");

    if (!authPages.includes(pathname)) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (authPages.includes(pathname)) {
      if (token) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }

  return NextResponse.next();
}
