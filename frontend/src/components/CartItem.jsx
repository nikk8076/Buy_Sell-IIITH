import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CartItem = (props) => {
  const itemId = props.id;

  const removeFromCart = async () => {
    console.log(itemId);
    const response = await axios.post('/deleteItem', { itemId });
    if (response.data.error) {
      toast.error(response.data.error);
    } else {
      toast.success("Item removed");
      props.onRemove(); // Call the callback function to update the cart state
    }
  };

  return (
    <div className=''>
      <div className='w-[400px] items-center flex flex-col gap-4 shadow-md border border-Gray rounded-lg px-3 py-4 text-[16px]'>
        <p><strong>Name: </strong>{props.name || "Loading..."}</p>
        <p><strong>Price: </strong>{"$ " + props.price || "Loading..."}</p>
        <div className='flex gap-8'>
          <button onClick={removeFromCart} className="bg-Red self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-1">Remove</button>
          <Link to={`/items/${itemId}`} className="bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-1">
            View Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItem;