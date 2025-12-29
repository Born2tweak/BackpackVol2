import { supabase } from '@/lib/supabase';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-3">Backpack Marketplace</h1>
          <p className="text-lg text-slate-500 mb-8">Buy and sell with fellow students on campus</p>
          
          <nav className="flex items-center justify-center gap-4">
            <a href="/sign-in" className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">
              Sign in
            </a>
            <a href="/create" className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 transition-colors">
              Create listing
            </a>
            <a href="/dashboard" className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              My listings
            </a>
          </nav>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-6 border-b border-slate-200 pb-3">
            Available Listings
          </h2>
          
          {!listings || listings.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <p className="text-slate-400 text-lg">No listings yet. Be the first to post!</p>
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
