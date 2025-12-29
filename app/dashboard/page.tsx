'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && supabase) {
      supabase
        .from('backpacks')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          setListings(data || []);
          setLoading(false);
        });
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || loading) {
    return <div className="min-h-screen p-8">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen p-8">
        <p>Please sign in to view your listings.</p>
        <a href="/sign-in" className="text-blue-600 underline">Sign in</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Listings</h1>
        <a href="/create" className="text-blue-600 underline mb-4 block">Create new listing</a>
        
        {listings.length === 0 ? (
          <p className="text-gray-500">You have no listings yet.</p>
        ) : (
          <ul className="space-y-4">
            {listings.map((listing) => (
              <li key={listing.id} className="border p-4 rounded">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-gray-600">${listing.price}</p>
              </li>
            ))}
          </ul>
        )}
        
        <a href="/" className="text-blue-600 underline block mt-4">Back to home</a>
      </div>
    </div>
  );
}
