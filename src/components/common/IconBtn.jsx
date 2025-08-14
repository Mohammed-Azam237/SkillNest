import React from 'react'
import {FiEdit} from "react-icons/fi"

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <div className='flex flex-row  items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg  md:px-5 font-semibold text-richblack-900 '>
        <button className='flex flex-row items-center gap-x-2'
        disabled={disabled}
        onClick={onclick}
        type={type}>
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ):(text)
            }
            
        </button>
      
    </div>
  )
}

export default IconBtn
