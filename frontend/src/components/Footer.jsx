import React from 'react'
import { assets } from '../assets/assets'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 mb-12">
          {/* Logo and Description */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <img src={assets.logo} className="mb-6 w-32" alt="Company Logo" />
              <p className="text-gray-600 max-w-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae voluptatem doloremque repellendus.
              </p>
            </CardContent>
          </Card>

          {/* Company Links */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl">COMPANY</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-black transition-colors flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl">GET IN TOUCH</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>0140000000</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>contact@foreveryou.com</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>123 Street, City, Country</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Copyright 2024 @ forevervvopvmvom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer