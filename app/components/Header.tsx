'use client';

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">Backpack</Link>
        <nav className="flex items-center gap-6">
          <SignedIn>
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">My Listings</Link>
            <Link href="/create" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">Sell Item</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                Sell Item
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
