export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
      <div className="bg-white rounded-lg shadow p-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
        <input type="text" placeholder="Enter your order number" className="border rounded px-4 py-2 w-full mb-4" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Track</button>
      </div>
    </div>
  )
}
