import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const RequirementField = ({name, label,register,errors,setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const[requirementList,setRequirementList] = useState([]);

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=> value.length > 0
        })
    },[])

    useEffect(()=>{
        console.log("Updated list:", requirementList);
        setValue(name, requirementList)
    },[requirementList])

    const handleAddRequirement=()=>{
        if(requirement){
            console.log("Adding:", requirement);
            setRequirementList(prev => [...prev, requirement.trim()]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }
  return (
    <div >
      
      <label  className='text-sm text-richblack-5' htmlFor={name}>{label}<sup className='text-pink-200'>*</sup></label>
      <div>
        <input
            type='text'
            id={name}
            value={requirement}
            onChange={(e)=>setRequirement(e.target.value)}
            className='w-full text-black form-style mt-2'
        />
        <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50'
        >
            Add
        </button>
      </div>

      {
        requirementList.length > 0 && (
            <ul className='mt-2 list-inside list-disc'>
                {
                    requirementList.map((requirement,index)=>(
                        <li key={index} className='flex items-center text-richblack-5'>
                            <span>{requirement}</span>
                            <button
                            type='button'
                            onClick={()=> handleRemoveRequirement(index)}
                            className=' ml-2 text-xs text-pure-greys-300'
                            >Clear</button>
                        </li>
                    ))
                }
            </ul>
        )
      }
      {errors[name] && (
        <span>
            {label} is required
        </span>
      )}
    </div>
  )
}

export default RequirementField
