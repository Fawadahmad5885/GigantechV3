import React from 'react'
import { RxCross2 } from "react-icons/rx";

export function IndustryPopUp({ onClose }) { 
    return (
      <div className='bg-primaryColor p-8 relative max-w-2xl w-full m-4'>
        <RxCross2 
          className='text-white text-[24px] absolute top-4 right-4 cursor-pointer'
          onClick={onClose} 
        />
        <h1 className='text-white font-poppins mt-6 text-3xl text-center'>
          Industries Popup
        </h1>
      </div>
    );
  }