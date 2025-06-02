import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/admin/posts",,"/api/news"];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);

    // / redirects to /news
    if (path === "/"){
        const url = req.nextUrl.clone()
        url.pathname = '/news'
        return NextResponse.redirect(url)
    }

    // Handling Cookies
    const c = await cookies();
    const cookie = c.get("session") // Returns either the cookie value or undefined (intellisense)
    
    // Handling Session
    let session;
    if (!cookie) session = undefined; // If cookie is undefined so is session
    else session = await decrypt(cookie.value);
    
    // Redirect to login if the route is protected and user is not logged in
    if (isProtectedRoute && !(session && session.user)) 
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    

    return NextResponse.next();
}