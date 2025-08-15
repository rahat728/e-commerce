// OurPolicy.jsx
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, ShieldCheck, HeadsetIcon } from "lucide-react"

const OurPolicy = () => {
  return (
    <div className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Policies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're committed to making your shopping experience exceptional</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <RotateCcw className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Easy Exchange Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">We offer hassle free exchange policy</p>
              <Badge variant="outline" className="mt-3">30 Days</Badge>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">We provide 7 days free return policy</p>
              <Badge variant="outline" className="mt-3">100% Satisfaction</Badge>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <HeadsetIcon className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Customer Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">We provide 24/7 customer support</p>
              <Badge variant="outline" className="mt-3">Always Available</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy