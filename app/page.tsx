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
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Backpack Marketplace</h1>
        <p className="text-gray-600 mb-6">Buy and sell with fellow students on campus.</p>
        <a href="/sign-in" className="text-blue-600 underline mb-8 block">Sign in</a>

        <h2 className="text-2xl font-semibold mb-4">Listings</h2>
        
        {!listings || listings.length === 0 ? (
          <p className="text-gray-500">No listings yet.</p>
        ) : (
          <ul className="space-y-4">
            {listings.map((listing) => (
              <li key={listing.id} className="border p-4 rounded">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-gray-600">${listing.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
