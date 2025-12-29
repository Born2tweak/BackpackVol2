'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!isSignedIn || !user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {user.fullName || user.firstName || 'Student'}
            </h1>
            <p className="text-gray-600 mb-2">
              {user.primaryEmailAddress?.emailAddress}
            </p>
            
            <div className="flex items-center space-x-4 mt-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                ✓ Verified Student
              </span>
            </div>
          </div>
          
          {user.imageUrl && (
            <img 
              src={user.imageUrl} 
              alt="Profile" 
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">My Listings</h2>
        
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Start selling items to your campus community</p>
          <Link
            href="/listings/create"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Your First Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
