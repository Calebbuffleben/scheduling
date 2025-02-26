import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(({ req }) => {
  const url = req.nextUrl;
  const pathSegments = url.pathname.split('/').filter(Boolean); // ["tenantId", "dashboard"]

  if (pathSegments.length > 0) {
    const tenantId = pathSegments[0];
    req.headers.set("X-Tenant-Id", tenantId);
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};