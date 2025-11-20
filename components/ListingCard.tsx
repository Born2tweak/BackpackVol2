'use client';

import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    images: string;
    location: string;
    createdAt: string;
    seller: {
      name: string;
      rating: number;
      badges: string;
    };
  };
  initialFavorited?: boolean;
}

export default function ListingCard({ listing, initialFavorited = false }: ListingCardProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const images = listing.images ? JSON.parse(listing.images) : [];
  const firstImage = images[0] || '/placeholder.jpg';
  
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/favorites', {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ listingId: listing.id }),
      });
      
      if (res.ok) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {firstImage !== '/placeholder.jpg' ? (
            <img
              src={firstImage}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <Heart
              className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          
          <span className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
            {listing.condition}
          </span>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {formatPrice(listing.price)}
          </p>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {listing.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{listing.location}</span>
            <span>{formatDate(listing.createdAt)}</span>
          </div>
          
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-sm text-gray-700">{listing.seller.name}</span>
            {JSON.parse(listing.seller.badges || '[]').includes('verified') && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                ✓ Verified
              </span>
            )}
            {listing.seller.rating > 0 && (
              <span className="text-xs text-yellow-600">
                ★ {listing.seller.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
