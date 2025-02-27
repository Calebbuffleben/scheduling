import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const clerk = clerkMiddleware();

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  let res = await clerkMiddleware()(req, event);

  if (!res) {
    res = NextResponse.next();
  }

  // Extract tenant ID from the first path segment
  const url = req.nextUrl;
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (pathSegments.length > 0) {
    const tenantId = pathSegments[0]; // First segment is the tenant ID
    res.headers.set("X-Tenant-Id", tenantId);
  }

  return res;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};