import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Upload, Star, Package } from 'lucide-react'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setCategory("Men")
        setSubCategory("Topwear")
        setBestseller(false)
        setSizes([])
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(item => item !== size)
        : [...prev, size]
    )
  }

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Add New Product
          </CardTitle>
          <CardDescription>
            Fill in the details below to add a new product to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={onsubmitHandler} className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <Label className="text-base font-medium flex items-center gap-2 mb-4">
                <Upload className="h-4 w-4" />
                Upload Images
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[image1, image2, image3, image4].map((img, idx) => (
                  <div key={idx} className="border rounded-md overflow-hidden aspect-square flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                    <label htmlFor={`image${idx + 1}`} className="cursor-pointer w-full h-full flex items-center justify-center">
                      {img ? (
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Product preview ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-xs">Upload</span>
                        </div>
                      )}
                    </label>
                    <input
                      onChange={(e) => {
                        const setter = [setImage1, setImage2, setImage3, setImage4][idx]
                        setter(e.target.files[0])
                      }}
                      type="file"
                      id={`image${idx + 1}`}
                      hidden
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Product Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Product Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sub Category</Label>
                <Select value={subCategory} onValueChange={setSubCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Topwear">Topwear</SelectItem>
                    <SelectItem value="Bottomwear">Bottomwear</SelectItem>
                    <SelectItem value="Winterwear">Winterwear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Available Sizes</Label>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map(size => (
                  <Badge
                    key={size}
                    variant={sizes.includes(size) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2"
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="bestseller"
                checked={bestseller}
                onCheckedChange={() => setBestseller(!bestseller)}
              />
              <Label htmlFor="bestseller" className="flex items-center gap-1 cursor-pointer">
                <Star className="h-4 w-4" />
                Add to Bestseller
              </Label>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Add