import { useState } from "react"
import Chats from "./chats"

const Navigator = () => {
    const [tab, setTab] = useState('request')
    const selectTab = (tab) => {
        setTab(tab)
    }
     
    return (
       <div className="flex flex-col w-full  ">
        <div className='bg-white flex justify-center items-center border-b py-4  '>
            <ul className='flex items-center  bg-[#F6F6F6] rounded-full w-[90%] justify-between '>
                <li onClick={()=>selectTab("request")} className={` px-8 text-[14px] font-semibold cursor-pointer py-3  first-line:rounded-none  ${tab==="request"?' bg-[#FFFFFF] shadow-lg border-b-2 rounded-full':' text-black '}`}>
                Request
                </li>
                <li  onClick={()=>selectTab("pending")} className={`px-8 text-[14px] font-semibold cursor-pointer py-3  first-line:rounded-none ${tab==="pending"?'bg-[#FFFFFF] shadow-lg border-b-2  rounded-full ':' text-black'}`}>
                Pending
                </li>
                <li  onClick={()=>selectTab("completed")} className={`px-8 text-[14px] font-semibold cursor-pointer py-3 first-line:rounded-none ${tab==="completed"?' bg-[#FFFFFF] shadow-lg border-b-2 rounded-full':' text-black'}`}>
                Completed
                </li>
            </ul>
        </div>
        <Chats status={tab}/>
       </div>
    )
}

export default Navigator