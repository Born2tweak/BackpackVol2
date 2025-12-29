'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CreateListingPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen p-8">
        <p>Please sign in to create a listing.</p>
        <a href="/sign-in" className="text-blue-600 underline">Sign in</a>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) return;

    setLoading(true);
    await supabase.from('backpacks').insert({
      title,
      description,
      price: price ? parseInt(price) : null,
      image_url: imageUrl,
      owner_id: user.id,
    });
    setLoading(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
        <a href="/" className="text-blue-600 underline block mt-4">Back to home</a>
      </div>
    </div>
  );
}
