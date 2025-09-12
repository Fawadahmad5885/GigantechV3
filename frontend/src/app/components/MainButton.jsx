import React from 'react'

function MainButton({ text }) {
    return (
      <button
        className="bg-white py-3 px-7 rounded-sm shadow-md"
      > 
        <span className='tracking-wide'>{text}</span>
      </button>
    );
  }
export default MainButton