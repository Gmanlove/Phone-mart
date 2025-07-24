import { Card } from "@/components/ui/card"

export default function AccessoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessories</h1>
      <p className="text-gray-600 mb-8">Explore our premium accessories for your devices.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map((i) => (
          <Card key={i} className="p-6 shadow-lg rounded-lg bg-white">
            <div className="h-32 w-full bg-gray-100 rounded mb-4" />
            <h2 className="text-xl font-semibold mb-2">Accessory {i}</h2>
            <p className="text-gray-500 mb-4">High quality accessory for your phone.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Shop Now</button>
          </Card>
        ))}
      </div>
    </div>
  )
}
