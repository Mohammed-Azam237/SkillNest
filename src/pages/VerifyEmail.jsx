import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{signupData,loading} = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,   
        } = signupData;
        dispatch(signUp(accountType, firstName, lastName , email, password, confirmPassword,otp,navigate));
    }
  return (
    <div className='text-white flex items-center justify-center mt-[150px]'>
        {
            loading ? (<div className=" h-[100vh] flex justify-center items-center"><div class="custom-loader"></div></div>):(
                <div>
                    <div className=' grid place-items-center'>
                        <div className='max-w-[500px] p-4 lg:p-8'>
                            <h1  className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent ot your email. Enter the code below</p>
                            <form onSubmit={handleOnSubmit}>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props)=> <input {...props} 
                                    className=' rounded-[10px]  border-richblack-500 text-[2rem] text-center border-[1px] border-red-500 flex justify-center items-center gap-10 text-richblack-900'
                                    
                                    />}
                                />
                                <button type='submit' className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                                    Verify Email
                                </button>

                            </form>

                            <div className='flex justify-between mt-3'>
                                <div>
                                    <Link to ="/login">
                                        <p className='flex items-center gap-x-2 text-richblack-5'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>Back to Login</p>
                                    </Link>
                                </div>

                                <button onClick={()=> dispatch(sendOtp(signupData.email, navigate))}>
                                    Resend it
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
      
    </div>
  )
}

export default VerifyEmail
