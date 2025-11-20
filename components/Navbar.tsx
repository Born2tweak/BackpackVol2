'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MessageCircle, User, PlusCircle, Heart, LogOut } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">🎒 Backpack</span>
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/listings/create"
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Sell Item</span>
                </Link>
                
                <Link
                  href="/messages"
                  className="p-2 hover:bg-gray-100 rounded-md"
                  title="Messages"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>
                
                <Link
                  href="/favorites"
                  className="p-2 hover:bg-gray-100 rounded-md"
                  title="Favorites"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                
                <Link
                  href="/profile"
                  className="p-2 hover:bg-gray-100 rounded-md"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>
                
                <button
                  onClick={() => signOut()}
                  className="p-2 hover:bg-gray-100 rounded-md"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
