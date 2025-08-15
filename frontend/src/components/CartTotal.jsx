// CartTotal.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    const fetchAmount = async () => {
      const amount = await getCartAmount();
      setCartAmount(amount);
    };
    fetchAmount();
  }, [getCartAmount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          <Title text1={'CART'} text2={'TOTALS'} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='flex justify-between'>
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">{currency}{cartAmount}.00</p>
        </div>
        <Separator />
        <div className='flex justify-between'>
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium">{currency}{delivery_fee}.00</p>
        </div>
        <Separator />
        <div className='flex justify-between text-lg font-bold'>
          <p>Total</p>
          <p>{currency}{cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartTotal;