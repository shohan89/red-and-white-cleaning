import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (nextUrl.pathname.startsWith("/admin")) return isLoggedIn
      return true
    },
    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    session({ session, token }) {
      if (session.user) (session.user as any).role = token.role
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
