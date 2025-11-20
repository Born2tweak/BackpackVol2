# 🎒 Backpack - Student Marketplace

A peer-to-peer marketplace built specifically for students to buy and sell items on campus. Built with Next.js 14 App Router and designed for seamless deployment on Vercel.

## ✨ Features

### Authentication
- Secure email/password authentication with NextAuth
- Requires `.edu` email addresses for verification
- Verified student badges for trust and safety

### Listings
- Create, view, and manage marketplace listings
- Upload photos (via UploadThing)
- Filter by category (Textbooks, Electronics, Furniture, etc.)
- Search functionality
- Condition tracking (New, Like New, Good, Fair, Poor)

### Messaging
- Real-time 1-on-1 chat between buyers and sellers
- Powered by Pusher for instant updates
- Message history stored in database

### User Profiles
- View your listings and sales history
- Rating system for sellers
- Achievement badges
- Campus location display

### Safety Features
- Verified student status
- Safety tips and guidelines
- Meet-up location recommendations
- Campus-focused design

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** Prisma ORM
  - SQLite (Development)
  - PostgreSQL (Production)
- **Authentication:** NextAuth.js
- **File Uploads:** UploadThing
- **Real-time:** Pusher
- **State Management:** TanStack Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A `.edu` email address for testing

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd backpack-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`: Get from [uploadthing.com](https://uploadthing.com)
- `PUSHER_*`: Get from [pusher.com](https://pusher.com)

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) to see the app.

## 📁 Project Structure

```
backpack-marketplace/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── listings/            # Listing pages
│   │   ├── create/
│   │   └── [id]/
│   ├── messages/            # Messaging
│   ├── profile/             # User profile
│   ├── favorites/           # Saved listings
│   └── api/                 # API routes
├── components/              # React components
│   ├── Navbar.tsx
│   ├── ListingCard.tsx
│   ├── SearchBar.tsx
│   └── CategoryFilters.tsx
├── lib/                     # Utility functions
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth config
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema
│   └── schema.prisma
└── types/                   # TypeScript types
```

## 🗄️ Database Schema

- **User**: Student accounts with verification
- **Listing**: Marketplace items
- **Message**: Chat messages
- **Conversation**: Chat threads
- **Favorite**: Saved listings
- **Rating**: Seller ratings

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository on [Vercel](https://vercel.com)

3. Configure environment variables in Vercel dashboard:
   - Add all variables from `.env.example`
   - Set `DATABASE_URL` to your PostgreSQL connection string
   - Update `NEXTAUTH_URL` to your production URL

4. Deploy!

### Database Migration (Production)

After deploying, run migrations:

```bash
npx prisma migrate deploy
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based sessions
- .edu email verification
- CSRF protection
- Environment variable protection

## 🛡️ Safety Guidelines

Built-in safety features include:
- Public campus meeting location recommendations
- Student ID verification prompts
- Safety banner on all listing pages
- Verified student badges
- Rating system for accountability

## 📝 Environment Variables

See `.env.example` for all required variables.

**Required for basic functionality:**
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

**Optional (for full features):**
- `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID` (image uploads)
- `PUSHER_*` variables (real-time messaging)

## 🤝 Contributing

This is a student marketplace project. Contributions are welcome!

## 📄 License

MIT License - feel free to use this project for your campus!

## 🎓 For Students, By Students

Built with ❤️ for the student community. Happy buying and selling!
