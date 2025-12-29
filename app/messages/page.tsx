'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function MessagesPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (isSignedIn) {
      fetchConversations();
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/conversations');
      const data = await res.json();
      setConversations(data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {conversations.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No conversations yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Start a conversation by contacting a seller on a listing
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv) => {
            const images = conv.listing.images ? JSON.parse(conv.listing.images) : [];
            const lastMessage = conv.messages[0];
            
            return (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {images[0] ? (
                      <img src={images[0]} alt={conv.listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{conv.listing.title}</h3>
                    {lastMessage && (
                      <p className="text-sm text-gray-600 truncate">{lastMessage.content}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
