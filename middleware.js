import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/admin/posts","/api/news"];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    // Uncomment this for protection
    const isProtectedRoute = protectedRoutes.includes(path);
    // const isProtectedRoute = false;
    

    const c = await cookies();
    const cookie = c.get("session") // Returns either the cookie value or undefined (intellisense)
    
    let session;
    if (!cookie) {
        session = undefined; // If cookie is undefined so is session
    } else {
       
        session = await decrypt(cookie.value);
    }
    
    if (isProtectedRoute && !(session && session.user)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}