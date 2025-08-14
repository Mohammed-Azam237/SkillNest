import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { contactusEndpoint } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import CountryCode from "../data/countrycode.json"

const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
        
    }= useForm();

    const submitContactForm = async(data)=>{
            console.log("Logging Data",data);
            try{
                setLoading(true);
                const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
                console.log("Logging Response", response);
                setLoading(false);
            }
            catch(error){
                console.log("Error", error.message);
                setLoading(false);
            }
              
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]);
  return (
    loading?(<div className=".custom-loader w-[100%] pt-[30%] pb-[30%]"><div className="custom-loader"></div></div>):(
    <div className=' bg-pure-greys-800 p-10 rounded-md'>
         <form onSubmit={handleSubmit(submitContactForm)} className={"flex flex-col gap-7 mt-7"}>
            <div className='flex flex-col gap-14'>
                    <div className='flex gap-5 lg:flex-row'>
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='firstName' className="lable-style">First Name</label>
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                placeholder='Enter Your First Name'
                                className=' form-style'
                                {...register("firstName",{required:true})}

                            />
                            {
                                errors.firstName && (
                                    <span className=" text-yellow-25">
                                        Please enter your name
                                    </span>
                                )
                            }
                        </div>
                        {/* last name */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor='lastname' className="lable-style">Last Name</label>
                            <input
                                type='text'
                                name='lastname'
                                id='lastname'
                                placeholder='Enter Your Last Name'
                                className='text-black form-style'
                                {...register("lastName")}

                            />
                            
                        </div>
                        
                    </div>
                    {/* email */}
                    <div className='flex flex-col gap-2'>
                            <label htmlFor='email' className="lable-style"> Email Address</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email'
                                className='text-black form-style'
                                {...register("email",{required:true})}
                            />
                            {
                                errors.email && (
                                    <span className=" text-yellow-25">
                                        Please Enter Your Email Address
                                    </span>
                                )
                            }
                        </div>

                        {/* phone number */}
                        <div className='flex flex-col gap-2'>
                                <label htmlFor='phoneNumber' className="lable-style">Phone Number</label>

                                <div className='flex flex-row gap-2'>
                                        {/* dropdown */}
                                    
                                            <select
                                                name='dropdown'
                                                id='dropdown'
                                                className='bg-yellow-50 w-[80px] form-style'
                                                {...register("countrycode",{required:true})}
                                            >
                                                {
                                                    CountryCode.map((element,index)=>{
                                                        return (
                                                            <option key={index} value={element.code}>
                                                                {element.code}-{element.country}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        

                                        <div className='flex w-[calc(100%-90px)] flex-col'>
                                            <input 
                                                type='number'
                                                name='phoneNumber'
                                                id='phoneNumber'
                                                placeholder='Enter Phone Number'
                                                className='text-black form-style'
                                                {...register("phoneNo",{required:{value:true,message:"Please Enter Phone Number"},
                                                maxLength:{value:10, message:"Invalid Phone Number"},
                                                minLength:{value:8,message:"Invalid Phone Number"}})}
                                            />
                                        </div>
                                </div>
                                {
                                    errors.phoneNo && (
                                        <span className=" text-yellow-25">
                                            {errors.phoneNo.message}
                                        </span>
                                    )
                                }
                        </div>

                        {/* message box */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='message' className="lable-style">Message</label>
                            <textarea 
                                name='message'
                                id='message'
                                cols="38"
                                rows="7"
                                placeholder='Enter Your Message Here'
                                className='text-black form-style'
                                {...register("message",{required:true})}
                            />
                            {
                                errors.message && (
                                    <span className=" text-yellow-25">
                                        Please Enter your Message.
                                    </span>
                                )
                            }
                        </div>

                        {/* send message button */}
                        <button type='submit' className='rounded-md  bg-yellow-50 text-center  text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] p-3'
                        >Send Message</button>
            </div>

        </form>
    </div>
    )
  )
}

export default ContactUsForm
