// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOption } from "./authOption"; // Move the options to a separate file

// Export handlers for GET and POST requests
export const GET = NextAuth(authOption);
export const POST = NextAuth(authOption);
