import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/public/(.*)'
]);

// Organization routes with different access levels
const isOrgRoute = createRouteMatcher([
  '/org/(.*)/dashboard',
  '/org/(.*)/products',
  '/org/(.*)/settings'
]);

const isOrgAdminRoute = createRouteMatcher([
  '/org/(.*)/members',
  '/org/(.*)/billing',
  '/org/(.*)/settings/advanced'
]);

const isOrgOwnerRoute = createRouteMatcher([
  '/org/(.*)/danger-zone',
  '/org/(.*)/delete'
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Get organization ID from URL
  const orgId = req.nextUrl.pathname.split('/').find(segment => 
    segment.startsWith('org_')
  );

  // Handle organization routes
  if (isOrgRoute(req)) {
    // Basic member access
    await auth.protect();
    
    if (orgId) {
      // Add organization context to headers
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-organization-id', orgId.replace('org_', ''));
      
      return NextResponse.next({
        request: { headers: requestHeaders }
      });
    }
  }

  // Handle admin routes
  if (isOrgAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ permission: 'org:admin' }) || 
             has({ permission: 'org:owner' });
    });
  }

  // Handle owner-only routes
  if (isOrgOwnerRoute(req)) {
    await auth.protect((has) => has({ permission: 'org:owner' }));
  }

  // If no organization in path but user is authenticated
  if (!orgId && !isPublicRoute(req)) {
    await auth.protect();
    return NextResponse.redirect(new URL('/organization-selector', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};