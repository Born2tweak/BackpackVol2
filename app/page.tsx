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
                    <div className="flex items-center justify-between mt-4">
                      <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                        {listing.price ? `$${listing.price}` : 'Free'}
                      </span>
                      <a 
                        href={`mailto:seller@campus.edu?subject=Interested in: ${encodeURIComponent(listing.title)}`}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Contact Seller
                      </a>
                    </div>
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
