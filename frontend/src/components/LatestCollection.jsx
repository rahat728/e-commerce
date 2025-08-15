// LatestCollection.jsx
import React, { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <div className="py-12 px-4 md:px-8">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center px-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-3xl font-bold">LATEST COLLECTIONS</CardTitle>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className='max-w-2xl mx-auto text-gray-600'>
            Discover our newest arrivals, carefully curated to bring you the latest trends and timeless classics.
          </p>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {latestProducts.map((item, index) => (
              <div key={index} className="relative">
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                {index < 3 && (
                  <Badge className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600">
                    New
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LatestCollection