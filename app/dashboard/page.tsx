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
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Sign in required</h2>
          <p className="text-slate-500 mb-6">Please sign in to view your listings.</p>
          <a href="/sign-in" className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">
            Sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <span className="mr-2">&larr;</span> Back to home
        </a>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Listings</h1>
            <p className="text-slate-500 mt-1">Manage your posted items</p>
          </div>
          <a href="/create" className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 transition-colors">
            + New Listing
          </a>
        </div>
        
        {listings.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">You have no listings yet.</p>
            <a href="/create" className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 transition-colors">
              Create your first listing
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all">
                {listing.image_url && (
                  <div className="w-full h-40 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                    <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{listing.title}</h3>
                {listing.description && (
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2">{listing.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600">
                    {listing.price ? `$${listing.price}` : 'Free'}
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Your listing</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
