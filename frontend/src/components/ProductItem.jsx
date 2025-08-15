import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)
    
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 h-full">
            <CardContent className="p-0 h-full">
                <Link to={`/product/${id}`} className="block h-full">
                    <div className="overflow-hidden aspect-square bg-gray-100">
                        <img 
                            className='w-full h-full object-cover transition-transform duration-500 hover:scale-110' 
                            src={image[0]} 
                            alt={name} 
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="font-medium text-sm truncate hover:text-primary transition-colors">{name}</h3>
                        <p className='text-sm font-semibold mt-1'>{currency}{price}</p>
                    </div>
                </Link>
            </CardContent>
        </Card>
    )
}

export default ProductItem