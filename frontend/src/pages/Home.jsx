// Home.jsx
import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import { Separator } from '@/components/ui/separator'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Separator className="my-8" />
      <LatestCollection />
      <Separator className="my-8" />
      <BestSeller />
      <Separator className="my-8" />
      <OurPolicy />
      <Separator className="my-8" />
      <NewsLetterBox />
    </div>
  )
}

export default Home