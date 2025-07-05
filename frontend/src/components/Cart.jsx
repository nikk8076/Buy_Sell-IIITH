import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = async () => {
    try {
      const response = await axios.get('/getCart');
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
      console.log(response.data.cart); // Log the response data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleTransaction = async () => {
    try {
      const response = await axios.post('/orders', { cart });
      alert(`The otp for your order is ${response.data.otp}. The seller has to enter it to sell the items.`);
      
      // Clear cart after successful order
      await axios.post('/clearCart');
      setCart([]);
      setTotalPrice(0);
      toast.success('Order placed successfully! Cart cleared.');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className='mt-20 flex flex-col gap-5'>
      {cart.length === 0 ? (
        <p className='text-center text-Blue text-2xl'>Your cart is empty.</p>
      ) : (
        <>
          <div className='items flex flex-row gap-10 flex-wrap px-4 py-2'>
            {cart.map((cartItem, index) => (
              <CartItem key={index} name={cartItem.name} id={cartItem.id} price={cartItem.price} onRemove={() => handleRemoveFromCart(index)} />
            ))}
          </div>
          <div className='flex justify-between items-center mt-4'>
            <p className='text-xl font-semibold'>Total Price: $ {totalPrice}</p>
            <button onClick={handleTransaction} className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white'>Buy items</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;