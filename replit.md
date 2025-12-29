# Backpack - Student Marketplace

## Overview

Backpack is a fully functional peer-to-peer marketplace application designed specifically for college students to buy and sell items within their campus communities. The platform emphasizes safety and trust through verified `.edu` email authentication, seller ratings, and campus-focused features. Built on Next.js 14 with the App Router architecture, the application is optimized for serverless deployment on Vercel.

**Current Status**: Production-ready with all core features implemented and security hardened.

The marketplace enables students to:
- Create listings with photos
- Browse items by category with search functionality
- Communicate through real-time messaging
- Save favorite listings
- Manage profiles with achievement badges and seller ratings

## Recent Changes (December 29, 2024)

### Major Updates
- ✅ Migrated authentication from NextAuth to Clerk
- ✅ Upgraded to Next.js 15.4.10 (security patched)
- ✅ Downgraded Prisma to v5.22.0 for stability with Next.js 15
- ✅ Fixed Prisma module export issue with new `lib/db.ts` pattern
- ✅ Added allowedDevOrigins configuration for proper CORS handling
- ✅ All API routes updated to use Clerk authentication

### Previous Implementation (November 2024)
- ✅ Migrated from Pages Router to App Router architecture
- ✅ Full listings CRUD with secure API routes
- ✅ Real-time messaging system with security hardening
- ✅ Favorites system with proper state management
- ✅ User profiles with ratings and badges
- ✅ Database schema implemented with Prisma
- ✅ Development workflow configured on port 5000

### Security Enhancements
- Conversation creation now validates listing ownership
- Message routes enforce participant verification
- Favorites API properly secured with session checks
- Badges stored as JSON arrays for proper data structure
- All API routes include proper authentication checks

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering**: Next.js 14 App Router with React Server Components and Client Components. The application uses a hybrid rendering strategy where pages are server-rendered and dynamic content is fetched client-side with proper credential handling.

**Routing Structure**: File-based routing with route groups:
- `(auth)/login` - User login page
- `(auth)/register` - New user registration
- `listings/create` - Create new listing
- `listings/[id]` - View listing details
- `messages` - Conversation list
- `messages/[conversationId]` - Individual chat
- `profile` - User profile and listings
- `favorites` - Saved listings

**State Management**: TanStack Query (React Query) for server state caching and synchronization. Client-side state is managed with React hooks. Session state is handled by NextAuth's SessionProvider. All fetch calls include `credentials: 'include'` for proper session handling.

**Styling**: TailwindCSS for utility-first styling with custom configurations. Global styles define CSS variables for theming and include base Tailwind layers.

**Type Safety**: Full TypeScript implementation with custom type definitions for NextAuth session extensions in `types/next-auth.d.ts`.

### Backend Architecture

**API Routes**: Next.js API routes (App Router format) organized by resource:
- `/api/auth/[...nextauth]` - NextAuth authentication handler
- `/api/auth/register` - User registration with .edu validation
- `/api/listings` - GET all listings, POST new listing (includes favorited status for authenticated users)
- `/api/listings/[id]` - GET listing details
- `/api/conversations` - POST create conversation (validates listing ownership, prevents self-messaging)
- `/api/conversations/[conversationId]/messages` - GET/POST messages (validates participant membership)
- `/api/favorites` - GET user favorites, POST/DELETE favorite listings
- `/api/profile` - GET user profile and their listings

**Authentication & Authorization**: NextAuth.js with JWT-based sessions using the Credentials provider. Custom authorization logic validates `.edu` email addresses during registration. Session callbacks extend the JWT token with user ID for API route authorization checks. All protected routes verify session with `getServerSession`.

**Data Layer**: Prisma ORM v7.0.0 for database access with SQLite (development) and PostgreSQL (production) support. The schema includes User, Listing, Message, Conversation, Favorite, and Rating models with proper relationships.

**Security Features**:
- Bcrypt password hashing with 10 salt rounds
- Session-based API authorization
- .edu email validation for registration
- Listing ownership verification for conversations
- Participant validation for message access
- Proper JSON parsing for badges and images
- CSRF protection via NextAuth

### Data Storage

**Database Strategy**: Prisma ORM with dual-database support:
- **Development**: SQLite file-based database at `prisma/dev.db`
- **Production**: PostgreSQL (configured via DATABASE_URL environment variable)

**Database Schema**:
- **User**: id, name, email, passwordHash, campus, image, rating, itemsSold, badges (JSON array), createdAt, updatedAt
- **Listing**: id, title, description, price, category, condition, images (JSON array), location, status, sellerId, createdAt, updatedAt
- **Conversation**: id, listingId, participants (many-to-many with User), messages, createdAt, updatedAt
- **Message**: id, content, senderId, conversationId, listingId, createdAt
- **Favorite**: id, userId, listingId, createdAt (unique constraint on userId+listingId)
- **Rating**: id, rating, comment, fromId, toId, createdAt

**File Storage**: UploadThing integration ready for image uploads (requires API keys in environment variables). Images stored as JSON arrays of URLs in the database.

### Real-time Communication

**Messaging System**: Polling-based message updates with 3-second intervals for conversation views. Messages are persisted in the database and retrieved through secure API routes with participant validation. The architecture supports future Pusher/Ably integration for WebSocket-based real-time updates.

**Conversation Management**: 
- One-to-one conversations scoped to specific listings
- Duplicate prevention (reuses existing conversation)
- Seller ownership validation
- Self-messaging prevention
- Participant membership required for all message operations

### Component Architecture

**Reusable Components**:
- `Navbar` - Persistent navigation with authentication state
- `ListingCard` - Listing display with favorite toggle (accepts initialFavorited prop)
- `SearchBar` - Search input with submit handling
- `CategoryFilters` - Category filter buttons
- `Providers` - SessionProvider and QueryClientProvider wrapper

**Page Components**:
- Homepage - Listing feed with search and category filters
- Login/Register - Authentication forms with .edu validation
- Create Listing - Form for new listings
- Listing Detail - Full listing view with contact seller button
- Messages - Conversation list and individual chat views
- Profile - User info, listings, and ratings
- Favorites - Saved listings grid

## External Dependencies

### Core Framework
- **Next.js** (v15.4.10): Core framework with App Router, API routes, and serverless functions
- **React** (v19.0.0): UI library
- **TypeScript** (v5.8.2): Type safety

### Authentication
- **Clerk** (@clerk/nextjs): Modern authentication with .edu email support
- Sign-in/sign-up handled via Clerk components

### Database
- **Prisma ORM** (v5.22.0): Type-safe database access
- **@prisma/client** (v5.22.0): Generated database client
- **PostgreSQL**: Production database via Replit/Neon

### UI & Styling
- **TailwindCSS** (v4.0.15): Utility-first CSS framework
- **Lucide React**: Icon library

### State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Utilities
- **date-fns**: Date formatting
- **@hookform/resolvers**: Form validation integration

### File Upload (Ready to Configure)
- **UploadThing**: Serverless image upload
- **@uploadthing/react**: React integration

### Real-time (Ready to Configure)
- **Pusher**: WebSocket service for real-time features
- **pusher-js**: Client library

## Environment Setup

### Required Variables
```env
DATABASE_URL="file:./prisma/dev.db"  # SQLite for development
NEXTAUTH_URL="http://localhost:5000"
NEXTAUTH_SECRET="generated-secret-key"
```

### Optional Variables (for full features)
```env
# UploadThing (image uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Pusher (real-time messaging)
NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-key"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_SECRET="your-pusher-secret"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"

# Production PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/database"
```

See `.env.example` for complete template.

## Development Workflow

### Configured Workflows
- **Start application**: `npm run dev` on port 5000 with webview output
- Development server runs at http://localhost:5000
- Hot reload enabled for all file changes

### Development Commands
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment Instructions

### Vercel Deployment
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables (see Environment Setup above)
4. Set `DATABASE_URL` to PostgreSQL connection string
5. Deploy!

### Database Migration for Production
```bash
npx prisma migrate deploy
```

## Known Limitations

1. **Image Uploads**: Requires UploadThing API keys to enable photo uploads for listings
2. **Real-time Messaging**: Currently uses polling (3-second intervals); requires Pusher configuration for true WebSocket real-time
3. **Infinite Scroll**: Homepage shows first 50 listings; infinite scroll can be added with pagination
4. **Email Verification**: Email verification for .edu addresses is format-based only (not sending verification emails)

## Future Enhancements

1. Configure UploadThing for image uploads
2. Integrate Pusher for real-time WebSocket messaging
3. Add pagination/infinite scroll for listings feed
4. Implement seller ratings functionality
5. Add listing edit functionality
6. Email verification via sent verification codes
7. Push notifications for new messages
8. Advanced search filters
9. Location-based sorting

## Security Notes

All critical security issues have been addressed:
- ✅ Conversation creation validates listing ownership
- ✅ Message routes verify participant membership
- ✅ Favorites API secured with proper authentication
- ✅ Badges stored as JSON arrays with proper parsing
- ✅ Password hashing with bcrypt
- ✅ Session-based API authorization
- ✅ .edu email validation
- ✅ CSRF protection

## Testing

To test the application:
1. Register with a `.edu` email address
2. Create a test listing
3. Browse listings with search and filters
4. Save favorite listings
5. Test messaging (requires two users)
6. View profile and listings

Current database is empty - create test data by registering users and creating listings.
