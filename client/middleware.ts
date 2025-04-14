import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  // Augment the request handler
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/join",
      newUser: "/auth/join",
    },
  }
);

// Configure which routes require authentication
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/protected/:path*",
    // More specific matcher that excludes /, /join, and other public routes
    "/((?!api|_next/static|_next/image|favicon.ico|join|auth|$).*)",
  ],
};
