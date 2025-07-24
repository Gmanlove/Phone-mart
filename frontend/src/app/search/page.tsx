export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
      <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
        <p className="text-gray-600 mb-4">Showing results for your query.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-24 w-full bg-gray-100 rounded mb-2" />
              <h2 className="text-lg font-semibold mb-1">Product {i}</h2>
              <p className="text-gray-500">Description of product {i}.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
