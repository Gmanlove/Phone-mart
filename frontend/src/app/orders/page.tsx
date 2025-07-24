export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
      <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        <p className="text-gray-600 mb-4">View and track your past orders.</p>
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="border rounded-lg p-4 flex justify-between items-center">
              <span>Order #{1000+i}</span>
              <span className="text-green-600">Delivered</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
