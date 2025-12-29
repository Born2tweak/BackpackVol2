'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import ListingCard from '@/components/ListingCard';

export default function FavoritesPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (isSignedIn) {
      fetchFavorites();
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

      {listings.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">You have not saved any listings yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} initialFavorited={true} />
          ))}
        </div>
      )}
    </div>
  );
}
