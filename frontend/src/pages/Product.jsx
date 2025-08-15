// Product.jsx
import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Star, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react'

const Product = () => {
    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className='container mx-auto px-4 py-8'>
            {/* Product Details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
                {/* Product Image */}
                <div className='space-y-4'>
                    <Card className="overflow-hidden border-0 shadow-md">
                        <CardContent className="p-0">
                            <img className='w-full h-auto object-cover' src={image} alt={productData.name} />
                        </CardContent>
                    </Card>
                    
                    <div className='flex gap-2 overflow-x-auto py-2'>
                        {productData.image.map((item, index) => (
                            <Card 
                                key={index} 
                                className={`flex-shrink-0 cursor-pointer border-2 ${image === item ? 'border-primary' : 'border-transparent'}`}
                                onClick={() => setImage(item)}
                            >
                                <CardContent className="p-1">
                                    <img className='w-20 h-20 object-cover' src={item} alt={`Thumbnail ${index}`} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className='space-y-6'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold'>{productData.name}</h1>
                        <div className='flex items-center gap-1 mt-2'>
                            <div className="flex">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400" />
                            </div>
                            <Badge variant="secondary" className="ml-2">(122)</Badge>
                        </div>
                    </div>

                    <div className='text-3xl font-bold'>
                        {currency}{productData.price}
                    </div>

                    <p className='text-gray-600'>{productData.description}</p>

                    <div className='space-y-4'>
                        <div>
                            <h3 className='font-medium mb-2'>Select Size</h3>
                            <div className='flex flex-wrap gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant={size === item ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSize(item)}
                                        className="min-w-[40px]"
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button 
                            onClick={() => addToCart(productData._id, size)} 
                            className="w-full gap-2"
                            disabled={!size}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            ADD TO CART
                        </Button>
                    </div>

                    <Separator />

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                        <div className='flex items-center gap-2'>
                            <Truck className="h-5 w-5 text-gray-500" />
                            <span>Free Shipping</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <RotateCcw className="h-5 w-5 text-gray-500" />
                            <span>Easy Returns</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Shield className="h-5 w-5 text-gray-500" />
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className='mb-16'>
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews (122)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className='space-y-4 text-gray-600'>
                                    <p>An ecommerce website is an online store that sells products or services over the internet. It allows customers to buy products or services directly from the website, without having to visit a physical store.</p>
                                    <p>Ecommerce websites typically use a combination of HTML, CSS, and JavaScript to create a user-friendly interface that allows customers to browse and purchase products.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reviews" className="mt-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Customer reviews will be displayed here.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : (
        <div className='flex items-center justify-center min-h-[50vh]'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )
}

export default Product