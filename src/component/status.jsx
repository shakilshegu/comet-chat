import React, { useContext } from 'react'
import { chatContext } from './context'

const Status = () => {
  const {currentOrder,setCurrentOrder} = useContext(chatContext)
    const status = currentOrder.order_status
  return (
    <>
   
    <div className={`font-normal text-xs h-6 mt-2 py-1 px-2 rounded-lg bg-opacity-10 border ${status=== "ORDER_COMPLETE" ?' border-[#38B865] text-[#38B865] bg-[#2FFF78]':' border-[#FAAD14] text-[#FAAD14] bg-[#FFBA2F]'} capitalize`}>                
    {status==="ORDER_COMPLETE"?<p className='text-[12px]'>COMPLETED</p>:<p className='text-[12px]'>PENDING</p>}
          </div>

</>
  )
}

export default Status





