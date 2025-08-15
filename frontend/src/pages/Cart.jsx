// Cart.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='text-2xl mb-8'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      
      {cartData.length === 0 ? (
        <Card className="py-16 text-center">
          <CardContent>
            <p className="text-gray-500">Your cart is empty</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 mb-8">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className='flex flex-col sm:flex-row items-center gap-4'>
                    {/* Left section - Product info */}
                    <div className='flex items-center gap-4 w-full sm:w-auto'>
                      <div className='rounded-lg overflow-hidden border'>
                        <img className='w-16 h-16 sm:w-20 sm:h-20 object-cover' src={productData.image[0]} alt={productData.name} />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium truncate'>{productData.name}</p>
                        <div className='flex items-center gap-3 mt-1'>
                          <p className="font-semibold">{currency}{productData.price}</p>
                          <Badge variant="secondary" className="text-xs">{item.size}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right section - Controls */}
                    <div className='flex items-center justify-between w-full sm:w-auto sm:ml-auto'>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Qty:</span>
                        <Input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || value === '0') return;
                            updateQuantity(item._id, item.size, Number(value));
                          }}
                          className="w-16 h-9 text-center"
                        />
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <img className='w-5 h-5' src={assets.bin_icon} alt='Remove' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className='flex justify-end mt-8'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end mt-6'>
            <Button 
              onClick={() => navigate('/place-order')} 
              className="w-full sm:w-auto bg-black hover:bg-gray-800"
              disabled={cartData.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;