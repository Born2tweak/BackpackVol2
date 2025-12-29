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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Sign in required</h2>
          <p className="text-slate-500 mb-6">Please sign in to create a listing.</p>
          <a href="/sign-in" className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">
            Sign in
          </a>
        </div>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-lg mx-auto">
        <a href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <span className="mr-2">&larr;</span> Back to home
        </a>
        
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Create Listing</h1>
          <p className="text-slate-500 mb-8">Share what you want to sell with fellow students.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="e.g., Calculus Textbook"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                rows={4}
                placeholder="Describe your item..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
