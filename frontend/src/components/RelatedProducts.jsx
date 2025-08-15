// RelatedProducts.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            setRelated(productsCopy.slice(0, 5))
        }
    }, [products, category, subCategory])

    return (
        <div className='py-12'>
            <Card className="border-0 shadow-none">
                <CardHeader className="text-center px-0">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <CardTitle className="text-2xl md:text-3xl font-bold">RELATED PRODUCTS</CardTitle>
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover more products similar to this one that you might like
                    </p>
                </CardHeader>
                <CardContent className="px-0">
                    {related.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                            {related.map((item, index) => (
                                <div key={index} className="relative group">
                                    <ProductItem 
                                        id={item._id} 
                                        name={item.name} 
                                        image={item.image} 
                                        price={item.price} 
                                    />
                                    {item.bestseller && (
                                        <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                                            Bestseller
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No related products found.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default RelatedProducts