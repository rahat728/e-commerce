import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>
      
      <div className='my-10 flex flex-col gap-16'>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:max-w-[450px] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <img className='w-full h-full object-cover' src={assets.about_img} alt='About Us'/>
          </div>
          
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <b className='text-gray-800 text-xl'>Our Mission</b>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        
        <div className='text-4xl py-4 text-center'>
          <Title text1={'Why'} text2={'Choose Us'} />
        </div>
        
        <div className='flex flex-col md:flex-row text-sm mb-20 gap-4 md:gap-0'>
          <Card className='flex-1 border-x-0 md:border-x md:border-l-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transition-all duration-300 hover:shadow-md'>
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl">Quality Assurance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className='text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </CardContent>
          </Card>
          
          <Card className='flex-1 border-x-0 md:border-x px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transition-all duration-300 hover:shadow-md'>
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl">Convenience</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className='text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </CardContent>
          </Card>
          
          <Card className='flex-1 border-x-0 md:border-x md:border-r-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transition-all duration-300 hover:shadow-md'>
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl">Exceptional Service</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className='text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <NewsLetterBox/>
      </div>
    </div>
  );
};

export default About;