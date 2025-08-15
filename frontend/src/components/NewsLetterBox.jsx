import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="w-full max-w-md mx-auto my-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Subscribe now & get 20% off</CardTitle>
        <CardDescription className="text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-3">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            required 
            className="flex-grow"
          />
          <Button type="submit" className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white">
            SUBSCRIBE
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsLetterBox;