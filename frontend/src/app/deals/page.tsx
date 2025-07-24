import { Card } from "@/components/ui/card"

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Hot Deals</h1>
      <p className="text-gray-600 mb-8">Grab the best deals on top phones and accessories!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map((i) => (
          <Card key={i} className="p-6 shadow-lg rounded-lg bg-white border border-red-100">
            <div className="h-32 w-full bg-red-50 rounded mb-4" />
            <h2 className="text-xl font-semibold mb-2">Deal {i}</h2>
            <p className="text-gray-500 mb-4">Limited time offer. Save big!</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Shop Deal</button>
          </Card>
        ))}
      </div>
    </div>
  )
}
