import { NextResponse } from "next/server";
import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";

export default clerkMiddleware(async (_, event) => {
  const { userId, orgId } = await getAuth(event);

  // Get organization from path
  const pathOrgId = event.nextUrl.pathname.split('/').find((segment: string) => 
    segment.startsWith('org_')
  );

  if (!pathOrgId && userId) {
    // If no organization in path, redirect to first organization or org creation
    if (orgId) {
      // Redirect to first organization
      return NextResponse.redirect(new URL(`/${orgId}/dashboard`, event.url));
    } else {
      // Redirect to organization creation
      return NextResponse.redirect(new URL('/create-organization', event.url));
    }
  }

  // Add organization context to headers
  if (pathOrgId && userId) {
    if (orgId !== pathOrgId) {
      return NextResponse.redirect(new URL('/unauthorized', event.url));
    }

    // Add organization ID to headers for API routes
    const requestHeaders = new Headers(event.headers);
    requestHeaders.set('x-organization-id', pathOrgId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};