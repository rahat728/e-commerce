import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react'

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Title text1={'Contact'} text2={'Us'} />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img 
              className='w-full h-auto object-cover' 
              src={assets.contact_img} 
              alt='Contact Us' 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="w-full lg:w-1/2">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Our Store
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">54709 willms Station<br />Suite 350, Washington, US</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">54709 willms Station<br />Suite 350, Washington, US</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">54709 willms Station<br />Suite 350, Washington, US</p>
                </div>
              </div>
              
              <Button className="mt-4 group" variant="outline">
                <Briefcase className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                Explore Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="mt-8">
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Contact