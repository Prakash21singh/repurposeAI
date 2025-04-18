import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";
import { IResponse, IUser } from "@/types/index";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password.",
        },
      },
      // In NextAuth config
      async authorize(credentials, req) {
        try {
          const result = await api.post<IResponse<IUser>>("/user/login", {
            ...credentials,
          });

          if (result.data.success) {
            return result.data.data;
          }
          console.log(result.data.message, "⭕⭕⭕");
          throw new Error(result.data.message || "Authentication failed");
        } catch (error: any) {
          console.error("Login error:", error);
          throw new Error(
            error.message || error.response?.data?.message || "Authentication failed"
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name || "Anonymous";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
