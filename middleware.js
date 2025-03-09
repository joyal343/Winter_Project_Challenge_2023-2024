import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/admin/posts"];

export default async function middleware(req) {
    // console.log("middleware")
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    
    // console.log(isProtectedRoute, path)

    const c = await cookies();
    const cookie = c.get("session") // Returns either the cookie value or undefined (intellisense)
    
    let session;
    if (!cookie) {
        session = undefined; // If cookie is undefined so is session
    } else {
        // console.log("cookie",cookie)
        session = await decrypt(cookie.value);
    }
    // console.log("session",session,"\n")

    if (isProtectedRoute && !(session && session.user)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}