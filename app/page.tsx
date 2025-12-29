export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Backpack Marketplace</h1>
        <p className="text-gray-600 mb-6">Buy and sell with fellow students on campus.</p>
        <a href="/sign-in" className="text-blue-600 underline">Sign in</a>
      </div>
    </div>
  );
}
