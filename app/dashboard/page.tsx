'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import Header from '../components/Header';

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchListings = async () => {
    if (user && supabase) {
      const { data } = await supabase
        .from('backpacks')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });
      setListings(data || []);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user && supabase) {
      fetchListings().then(() => setLoading(false));
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed || !supabase) return;

    setDeleting(id);
    await supabase.from('backpacks').delete().eq('id', id);
    await fetchListings();
    setDeleting(null);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="flex items-center justify-center py-20">
          <p className="text-gray-400">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">&larr; Back to listings</a>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your posted items</p>
          </div>
          <a href="/create" className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
            + New Listing
          </a>
        </div>
        
        {listings.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
            <p className="text-gray-400 mb-4">You have no listings yet</p>
            <a href="/create" className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
              Create your first listing
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="w-full h-36 bg-gray-100">
                  {listing.image_url ? (
                    <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                  {listing.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{listing.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      {listing.price ? `$${listing.price}` : 'Free'}
                    </span>
                    <button
                      onClick={() => handleDelete(listing.id, listing.title)}
                      disabled={deleting === listing.id}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                    >
                      {deleting === listing.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
