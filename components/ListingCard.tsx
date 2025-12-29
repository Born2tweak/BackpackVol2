'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Heart, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  images: string;
  seller: {
    name: string;
  };
}

interface ListingCardProps {
  listing: Listing;
  initialFavorited?: boolean;
}

export default function ListingCard({ listing, initialFavorited = false }: ListingCardProps) {
  const { isSignedIn } = useUser();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const images = listing.images ? JSON.parse(listing.images) : [];
  const imageUrl = images[0] || null;

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) return;
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/favorites', {
        method: favorited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id }),
      });

      if (res.ok) {
        setFavorited(!favorited);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          {isSignedIn && (
            <button
              onClick={handleFavorite}
              disabled={loading}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
          )}
          
          <span className="absolute bottom-2 left-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            {listing.category}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {formatPrice(listing.price)}
          </p>
          
          <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{listing.location}</span>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
              {listing.condition}
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            by {listing.seller?.name || 'Unknown'}
          </p>
        </div>
      </div>
    </Link>
  );
}
