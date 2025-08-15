// Hero.jsx
import React from 'react'
import { assets } from '../assets/assets'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <Card className="border-0 shadow-none rounded-none overflow-hidden">
      <CardContent className="p-0">
        <div className='flex flex-col md:flex-row'>
          {/* Hero Left Side */}
          <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16'>
            <div className='space-y-6'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-0.5 bg-primary'></div>
                <p className='font-medium text-sm md:text-base text-primary'>OUR BESTSELLERS</p>
              </div>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>Latest Arrivals</h1>
              <p className='text-gray-600 max-w-md'>Discover our newest collection of premium products crafted with attention to detail and quality.</p>
              <Button className="group mt-4">
                SHOP NOW
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          {/* Hero Right Side */}
          <div className='w-full md:w-1/2'>
            <img className='w-full h-full object-cover' src={assets.hero_img} alt='Latest Arrivals' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Hero