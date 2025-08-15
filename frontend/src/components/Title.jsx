import React from 'react';
import { Separator } from '../components/ui/separator';

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-center justify-center mb-3'>
      <div className='flex items-center gap-2'>
        <p className='text-gray-500'>
          {text1} <span className='text-gray-700 font-medium'>{text2}</span>
        </p>
      </div>
      <Separator className='w-8 sm:w-12 h-px bg-gray-700 mt-1' />
    </div>
  );
};

export default Title;