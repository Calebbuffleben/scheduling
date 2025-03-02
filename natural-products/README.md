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
