import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"


const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully commited to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully commited to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully commited to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully commited to the success company",
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 items-center'>

            <div className=' w-[45%] flex flex-col gap-1'>
                    {
                        timeline.map((element, index)=>{
                            return (
                                <div className='flex flex-row gap-6' key={index}>
                                    <div className=' flex flex-col rounded-full w-fit h-fit  items-center'>
                                            <img src={element.Logo} className='bg-white rounded-full w-10 h-10'/>
                                            {
                                                index !== timeline.length-1 && (<div className="border  border-t-0 border-b-0 border-dashed border-[#AFB2BF] h-[50px] my-1"></div>)
                                            }
                                              
                                    </div>
                                    

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>

            <div className="relative  shadow-xl z-10">
             {/* 👇 BLOB GLOW BACKGROUND */}
             <div className="rounded-full absolute -z-50 w-[35rem] left-15 top-20  h-[15rem] shadow-[inset_0px_0px_80px_#fff,inset_50px_0px_200px_#935a24,inset_50px_0px_200px_#935a24,0px_0px_80px_#fff,50px_0px_100px_#935a24,-50px_0px_100px_#935a24] bg-[#935a24]"></div>
                
            <div className="relative z-10">
                    <div className="absolute top-[15px] left-[15px] w-full h-full bg-white border-white  opacity-200 -z-10 shadow-2xl" />
                    <img
                    src={timelineImage}
                    alt="Student"
                    className=" object-cover h-fit shadow-white"
                    />
            </div>

                <div className='absolute bg-brown-700 flex flex-row  text-white uppercase py-6 left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg z-20'>
                    <div className='flex flex-row gap-5 items-center border-r border-brown-300 px-6'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-brown-5 text-sm'>Years of Experience</p>
                    </div>

            
                    <div className='flex gap-5 items-center px-6'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-brown-5 text-sm'>Type of Courses</p>
                    </div>
                </div>


            </div>

        </div>
      
    </div>
  )
}

export default TimelineSection
