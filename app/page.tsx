export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Backpack Marketplace</h1>
        <p className="text-gray-600 mb-6">
          Buy and sell with fellow students on campus
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Safety First:</strong> Always meet in public places on campus. 
            Verify student IDs before transactions. Report suspicious activity.
          </p>
        </div>
      </div>

      <div className="text-center py-12">
        <p className="text-gray-500">Listings coming soon</p>
      </div>
    </div>
  );
}
