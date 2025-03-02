# Natural Products Management System

A multi-tenant product management system built with Next.js, Clerk, and Prisma.

## Features

### Multi-tenancy
- Organization-based data isolation
- Secure tenant routing
- Automatic organization context handling
- Organization-specific product management

### Authentication & Authorization
- Secure user authentication via Clerk
- Organization membership management
- Role-based access control
- Protected API routes

### Product Management
- Create, read, update, and delete products
- Organization-specific product catalogs
- SKU management (unique within organizations)
- Inventory tracking

## Tech Stack

- **Frontend**: Next.js 15.1.4
- **Authentication**: Clerk
- **Database**: PostgreSQL
- **ORM**: Prisma 6.3.1
- **Styling**: Tailwind CSS 3.4.1
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── api-connection/    # API client setup
├── components/        # React components
├── contexts/         # React contexts
├── hooks/           # Custom hooks
├── interfaces/      # TypeScript interfaces
├── pages/          # Next.js pages
├── server/         # Server-side logic
│   ├── database/   # Database operations
│   └── services/   # Business logic
├── styles/         # CSS styles
└── types/         # TypeScript types
```

## Database Schema

```prisma
model Organization {
  id          String    @id
  name        String
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id              String       @id @default(uuid())
  name            String
  sku             String
  price           String
  quantity        Int
  description     String
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@unique([sku, organizationId])
  @@index([organizationId])
}
```

## Setup & Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd natural-products
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Multi-tenant Implementation

### Middleware
The application uses Clerk middleware to handle organization context:

```typescript
import { NextResponse } from "next/server";
import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";

export default clerkMiddleware(async (_, event) => {
  const { userId, orgId } = await getAuth(event);

  // Organization routing and context handling
  const pathOrgId = event.nextUrl.pathname.split('/').find((segment: string) => 
    segment.startsWith('org_')
  );

  // ... organization context logic
});
```

### API Routes
All API routes are organization-aware:

```typescript
// Example API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const organizationId = req.headers['x-organization-id'] as string;
  
  if (!organizationId) {
    return res.status(400).json({ message: "Organization ID is required" });
  }

  // Organization-specific logic
}
```

### Data Access
Products are automatically scoped to organizations:

```typescript
// Example repository method
async findAll(organizationId: string) {
  return await prisma.product.findMany({
    where: { organizationId }
  });
}
```

## URL Structure

- `/` - Home page
- `/sign-in` - Authentication
- `/create-organization` - Organization creation
- `/{org_id}/dashboard` - Organization dashboard
- `/{org_id}/products` - Product management
- `/{org_id}/products/{product_id}` - Product details

## Security Features

1. **Data Isolation**
   - Each organization's data is completely isolated
   - Cross-organization access is prevented
   - SKUs are unique within organizations

2. **Authentication**
   - JWT-based authentication
   - Secure session management
   - Protected API routes

3. **Authorization**
   - Organization membership verification
   - Role-based access control
   - API route protection

## Development Guidelines

1. **Adding New Features**
   - Always include organization context
   - Use the `useOrganization` hook for UI
   - Add proper type definitions

2. **API Development**
   - Always validate organization context
   - Include error handling
   - Follow RESTful conventions

3. **Database Operations**
   - Always include organization filtering
   - Use transactions when necessary
   - Follow Prisma best practices

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your License]

## Middleware Documentation

The application uses a sophisticated middleware system to handle authentication, authorization, and organization access control.

### Route Protection

#### Public Routes
```typescript
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/public/(.*)'
]);
```
These routes are accessible without authentication. They include:
- Homepage
- Authentication pages
- Public API endpoints

#### Organization Routes
```typescript
const isOrgRoute = createRouteMatcher([
  '/org/(.*)/dashboard',
  '/org/(.*)/products',
  '/org/(.*)/settings'
]);
```
Basic organization routes requiring member access:
- Organization dashboard
- Product management
- Basic settings

#### Admin Routes
```typescript
const isOrgAdminRoute = createRouteMatcher([
  '/org/(.*)/members',
  '/org/(.*)/billing',
  '/org/(.*)/settings/advanced'
]);
```
Routes requiring administrative privileges:
- Member management
- Billing operations
- Advanced settings

#### Owner Routes
```typescript
const isOrgOwnerRoute = createRouteMatcher([
  '/org/(.*)/danger-zone',
  '/org/(.*)/delete'
]);
```
Routes restricted to organization owners:
- Dangerous operations
- Organization deletion

### Access Control Flow

1. **Public Access Check**
   ```typescript
   if (isPublicRoute(req)) {
     return NextResponse.next();
   }
   ```
   - Allows unrestricted access to public routes
   - No authentication required

2. **Organization Context**
   ```typescript
   const orgId = req.nextUrl.pathname.split('/').find(segment => 
     segment.startsWith('org_')
   );
   ```
   - Extracts organization ID from URL
   - Used for context and access control

3. **Member Access**
   ```typescript
   if (isOrgRoute(req)) {
     await auth.protect();
     // ... organization context handling
   }
   ```
   - Requires basic authentication
   - Sets organization context in headers
   - Enables organization-specific data access

4. **Admin Access**
   ```typescript
   if (isOrgAdminRoute(req)) {
     await auth.protect((has) => {
       return has({ permission: 'org:admin' }) || 
              has({ permission: 'org:owner' });
     });
   }
   ```
   - Requires admin or owner permissions
   - Enables access to administrative functions

5. **Owner Access**
   ```typescript
   if (isOrgOwnerRoute(req)) {
     await auth.protect((has) => has({ permission: 'org:owner' }));
   }
   ```
   - Strictest permission level
   - Required for critical operations

6. **Organization Selection**
   ```typescript
   if (!orgId && !isPublicRoute(req)) {
     await auth.protect();
     return NextResponse.redirect(new URL('/organization-selector', req.url));
   }
   ```
   - Redirects authenticated users without an organization context
   - Ensures proper organization selection

### Organization Context Headers

When accessing organization routes, the middleware adds organization context:
```typescript
const requestHeaders = new Headers(req.headers);
requestHeaders.set('x-organization-id', orgId.replace('org_', ''));
```

This enables:
- Organization-specific data filtering
- Proper multi-tenant isolation
- Context-aware API responses

### URL Pattern Matching

```typescript
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```
The middleware applies to:
- All application routes
- API routes
- Excludes static files and Next.js internals

### Permission Levels

1. **Public**
   - No authentication required
   - Access to public pages and resources

2. **Member**
   - Basic authentication required
   - Access to organization-specific content
   - View and interact with products

3. **Admin**
   - Enhanced permissions
   - Member management
   - Billing access
   - Advanced settings

4. **Owner**
   - Highest permission level
   - Critical organization operations
   - Complete administrative control

### Best Practices

1. **Route Organization**
   - Keep routes organized by permission level
   - Use clear naming conventions
   - Maintain consistent URL structure

2. **Permission Checks**
   - Always check permissions before access
   - Use the most restrictive permission necessary
   - Combine permissions logically when needed

3. **Organization Context**
   - Always include organization context in headers
   - Validate organization access
   - Maintain proper isolation between organizations

4. **Error Handling**
   - Redirect unauthorized users appropriately
   - Maintain security during errors
   - Provide clear user feedback

### Security Considerations

1. **Authentication**
   - All non-public routes require authentication
   - Uses Clerk's secure authentication system
   - Proper session management

2. **Authorization**
   - Role-based access control
   - Granular permission system
   - Proper permission validation

3. **Data Isolation**
   - Organization-specific data access
   - Proper header management
   - Secure context handling

4. **URL Security**
   - Proper route matching
   - Protected sensitive routes
   - Secure parameter handling
