import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { authConfig } from "@/auth.config"

const authProxy = NextAuth(() => ({ ...authConfig })).auth as unknown as (
  request: NextRequest
) => Promise<Response> | Response

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"])

export default function proxy(request: NextRequest) {
  if (request.nextUrl.protocol === "http:" && !LOCAL_HOSTNAMES.has(request.nextUrl.hostname)) {
    const httpsUrl = request.nextUrl.clone()
    httpsUrl.protocol = "https:"
    return NextResponse.redirect(httpsUrl, 301)
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    return authProxy(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
