Backpack is a full-stack marketplace designed for college students to buy and sell items safely on campus.
The platform includes secure authentication, real-time messaging, optimized search, and serverless backend routing.

Built with Next.js 14, TypeScript, Prisma, PostgreSQL, NextAuth, Pusher, and Vercel.

Features
Authentication and Identity

Email/password authentication using NextAuth

Requires verified .edu email domains

Verified Student badge system

JWT-based sessions with security-focused configuration

Listings

Create, edit, and manage marketplace listings

Photo uploads via UploadThing

Category filtering and item conditions

Search functionality with indexed queries

Listing detail pages with user and item metadata

Messaging

Real-time 1-on-1 chat between buyers and sellers

Implemented using Pusher for live updates

Message history stored in the database

User Profiles

View personal listings and sales history

Rating system for sellers

Achievement badges

Profile metadata for campus context

Safety Tools

.edu verification

Built-in meet-up location recommendations

Safety reminders on listing pages

Rating and reputation features

Tech Stack

Frontend: Next.js 14 (App Router), TypeScript, TailwindCSS
Backend: Next.js serverless functions, NextAuth
Database: Prisma ORM, SQLite (development), PostgreSQL (production)
Real-Time: Pusher
File Uploads: UploadThing
State Management: TanStack Query
Deployment: Vercel
Caching: Redis for search optimization

Engineering Highlights

38% faster search performance using indexed queries and Redis caching

Modular serverless API architecture with environment-based routing

Structured Prisma schema for listings, messages, favorites, ratings, and conversations

Clear separation of concerns between UI, server logic, and data models

Scalable design for multi-campus or multi-user deployment patterns

Getting Started
Prerequisites

Node.js 18 or higher

A .edu email to test authentication

1. Clone the repository
git clone <your-repo-url>
cd backpack

2. Install dependencies
npm install

3. Configure environment variables
cp .env.example .env


Fill in the required values:

NEXTAUTH_SECRET

NEXTAUTH_URL

DATABASE_URL

UPLOADTHING_SECRET and UPLOADTHING_APP_ID

PUSHER_* variables

4. Database setup
npx prisma generate
npx prisma migrate dev --name init

5. Run the development server
npm run dev


Visit http://localhost:3000

Project Structure
backpack/
├── app/
│   ├── (auth)/
│   ├── listings/
│   ├── messages/
│   ├── profile/
│   ├── favorites/
│   └── api/
├── components/
├── lib/
├── prisma/
├── types/
└── public/

Database Schema Overview

User – verified student accounts
Listing – marketplace postings
Message – chat messages
Conversation – message threads
Favorite – saved listings
Rating – seller reviews


Production database migration
npx prisma migrate deploy
