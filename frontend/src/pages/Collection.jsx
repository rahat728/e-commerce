import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown } from 'lucide-react'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (value) => {
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (value) => {
    setSubCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const applyFilter = () => {
    let productsCopy = products.slice()
    
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => 
        category.includes(item.category)
      )
    }
    
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        subCategory.includes(item.subcategory)
      )
    }
    
    setFilterProducts(productsCopy)
  }

  const sortProducts = () => {
    let fpCopy = [...filterProducts]
    
    switch (sortType) {
      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price)
        break
      default:
        applyFilter()
        return
    }
    
    setFilterProducts(fpCopy)
  }

  useEffect(() => {
    sortProducts()
  }, [sortType])
  
  useEffect(() => {
    setFilterProducts(products)
  }, [])
  
  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Filter Options */}
        <div className='w-full lg:w-64 flex-shrink-0'>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-0 h-auto font-semibold text-lg mb-4"
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
          </Button>
          
          <div className={`${showFilter ? 'block' : 'hidden'} lg:block space-y-4`}>
            {/* Category Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">CATEGORIES</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox 
                      id={cat.toLowerCase()} 
                      checked={category.includes(cat)}
                      onCheckedChange={() => toggleCategory(cat)}
                    />
                    <label 
                      htmlFor={cat.toLowerCase()} 
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* SubCategory Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">TYPES</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={type.toLowerCase()} 
                      checked={subCategory.includes(type)}
                      onCheckedChange={() => toggleSubCategory(type)}
                    />
                    <label 
                      htmlFor={type.toLowerCase()} 
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right Side */}
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            
            {/* Product Sort */}
            <Select value={sortType} onValueChange={setSortType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Sort By: Relevant</SelectItem>
                <SelectItem value="low-high">Sort By: Low To High</SelectItem>
                <SelectItem value="high-low">Sort By: High To Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Map Products */}
          {filterProducts.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {filterProducts.map((item, index) => (
                <ProductItem 
                  key={index} 
                  id={item._id} 
                  name={item.name} 
                  image={item.image} 
                  price={item.price} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection