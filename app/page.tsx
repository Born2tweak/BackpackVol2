'use client';

import { useState, useEffect } from 'react';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilters from '@/components/CategoryFilters';

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchListings();
  }, [category, search]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (search) params.append('search', search);
      
      const res = await fetch(`/api/listings?${params}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Backpack Marketplace</h1>
        <p className="text-gray-600 mb-6">
          Buy and sell with fellow students on campus
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>🛡️ Safety First:</strong> Always meet in public places on campus. 
            Verify student IDs before transactions. Report suspicious activity.
          </p>
        </div>

        <SearchBar onSearch={setSearch} />
        <CategoryFilters selected={category} onSelect={setCategory} />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No listings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} initialFavorited={listing.favorited} />
          ))}
        </div>
      )}
    </div>
  );
}
