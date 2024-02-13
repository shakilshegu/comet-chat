// OrderStatus component
import React, { useContext } from 'react';
import { chatContext } from './context';

const OrderStatus = () => {
  const {currentOrder,setCurrentOrder} = useContext(chatContext)
  return (
    <div>
    <div className=' flex justify-between px-4'>
      <h1 className='font-bold text-[24px]'>Details</h1>
      <p className='text-green-400  font-[8px]'>View More</p>
    </div>
    <div className='px-4 mt-8'>
      <h3 className='text-[#B9B9B9]  py-2'>Content type</h3>
      <p className=' font-semibold text-sm '>{currentOrder?.Package?.content_type}</p>
      <h3 className='text-[#B9B9B9]  py-2'>Apply</h3>
      <p className=' font-semibold text-sm '>No need a to send  physical  product</p>
      <h3 className='text-[#B9B9B9]  py-2'>Upload private content</h3>
      <p className=' font-semibold text-sm '>{currentOrder?.order_created_at}</p>
      <h3 className='text-[#B9B9B9]  py-2'>Upload official content</h3>
      <p className=' font-semibold text-sm '>{currentOrder?.order_completed_at}</p>
    </div>
    </div>
  );
};

export default OrderStatus;
