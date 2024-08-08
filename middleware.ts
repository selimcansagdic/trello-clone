import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  // Webhook rotası korunmamalıdır.
  if (req.nextUrl.pathname === "/api/webhook") {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
