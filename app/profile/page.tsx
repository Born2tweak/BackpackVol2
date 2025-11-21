'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import { Star } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.id) {
      fetchProfile();
    }
  }, [session, status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile', {
        credentials: 'include',
      });
      const data = await res.json();
      setUser(data.user);
      setListings(data.listings);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
            {user.campus && (
              <p className="text-gray-600 mb-4">📍 {user.campus}</p>
            )}
            
            <div className="flex items-center space-x-4">
              {JSON.parse(user.badges || '[]').includes('verified') && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  ✓ Verified Student
                </span>
              )}
              
              {user.rating > 0 && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold">{user.rating.toFixed(1)}</span>
                </div>
              )}
              
              <span className="text-gray-600">
                {user.itemsSold} items sold
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">My Listings</h2>
        
        {listings.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You haven&apos;t created any listings yet</p>
            <Link
              href="/listings/create"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} initialFavorited={listing.favorited} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
