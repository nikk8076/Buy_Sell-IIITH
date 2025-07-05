import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { myContext } from '../../context/myContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Item = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name, price, description, category, seller_id } = location.state || {};
  const [sellerDetails, setSellerDetails] = useState({});
  useEffect(() => {
    axios.post('/name',{ seller_id })
      .then((response) => {
        console.log(response.data, "here");
        setSellerDetails({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          contactNumber: response.data.contactNumber,
          contactEmail: response.data.seller_email,
          buyerEmail: response.data.buyer_email,
        });
      })
      .catch((error) => {
        console.error(error);
      })
  },[]);
  const addToCart = async () => {
    const buyer_email = sellerDetails.buyerEmail;
    const response = await axios.post('/cart', { id ,name, price, seller_id, buyer_email } , { withCredentials: true });
    if(response.data.error)
    {
      toast.error("error adding to cart");
    }
    else
    {
      toast.success("Added to cart");
    }
  };
  return (
    <div className='mt-28 flex flex-col gap-3 shadow-md border border-Gray rounded-lg px-5 py-4 text-[16px]'>
      <img src="" alt="item-image" className='mb-20 self-center' />
      <p><strong>Name: </strong>{name || "Loading..."}</p>
      <p><strong>Price: </strong>{"$"+" "+price || "Loading..."}</p>
      <p><strong>Category: </strong>{category || "Loading"}</p>
      <p><strong>Description: </strong>{description || "Loading..."}</p>
      <p><strong>Seller: </strong>{(sellerDetails.firstName) || "Loading..."}</p>
      <p><strong>Seller contact: </strong>{sellerDetails.contactNumber || "Loading..."}</p>
      <p><strong>Seller email: </strong>{sellerDetails.contactEmail || "Loading..."}</p>
      <button onClick={addToCart} className="bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-1">Add to cart</button>
    </div>
  )
}

export default Item