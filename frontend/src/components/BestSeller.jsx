// BestSeller.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller))
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className='py-12 px-4 md:px-8'>
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center px-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <CardTitle className="text-3xl font-bold">BEST SELLERS</CardTitle>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
          <p className='max-w-2xl mx-auto text-gray-600'>
            Discover our most popular products loved by thousands of customers worldwide.
          </p>
        </CardHeader>
        <CardContent className="px-0">
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
            {bestSeller.map((item, index) => (
              <div key={index} className="relative">
                <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                  Bestseller
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BestSeller