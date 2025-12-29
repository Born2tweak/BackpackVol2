'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { formatPrice, formatDate } from '@/lib/utils';
import { Heart, MessageCircle, MapPin, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ListingDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await fetch(`/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
    } catch (error) {
      console.error('Failed to fetch listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id, sellerId: listing.sellerId }),
      });

      const data = await res.json();
      router.push(`/messages/${data.id}`);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!listing) {
    return <div className="container mx-auto px-4 py-8">Listing not found</div>;
  }

  const images = listing.images ? JSON.parse(listing.images) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={listing.title}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`${listing.title} ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${
                    currentImageIndex === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-2">
            {listing.category}
          </span>
          
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
          <p className="text-4xl font-bold text-blue-600 mb-4">
            {formatPrice(listing.price)}
          </p>

          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(listing.createdAt)}
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              {listing.condition}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">Seller Information</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{listing.seller?.name || 'Student Seller'}</p>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  ✓ Verified Student
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Safety Tips:</strong> Meet in public campus locations. 
              Verify student ID. Never share personal financial information.
            </p>
          </div>

          <button
            onClick={handleContact}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contact Seller</span>
          </button>
        </div>
      </div>
    </div>
  );
}
