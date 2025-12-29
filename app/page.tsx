import { supabase } from '@/lib/supabase';
import Header from './components/Header';

export default async function HomePage() {
  let listings: any[] | null = null;
  
  if (supabase) {
    const { data } = await supabase
      .from('backpacks')
      .select('*')
      .order('created_at', { ascending: false });
    listings = data;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Marketplace</h1>
          <p className="text-gray-500">Buy and sell with fellow students on campus</p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Available Listings</h2>
          
          {!listings || listings.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
              <p className="text-gray-400 mb-4">No listings yet</p>
              <a href="/create" className="text-sm text-gray-900 underline hover:no-underline">Be the first to post</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {listing.image_url && (
                    <div className="w-full h-36 bg-gray-50">
                      <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                    {listing.description && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{listing.description}</p>
                    )}
                    <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                      {listing.price ? `$${listing.price}` : 'Free'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
