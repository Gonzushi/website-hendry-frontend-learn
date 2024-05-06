import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/auth"

export async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl;

    if (session == null) {
        if (pathname.startsWith("/api")) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL("/api/auth/signin", request.url))
        }
    } else {
        return NextResponse.next()
    }
} 