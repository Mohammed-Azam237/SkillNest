import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from '../components/common/Footer'
import ExploreMore from "../components/core/HomePage/ExploreMore"
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>
    {/* section 1 making */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>
            <Link to={"/signup"}>
                <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instrutor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-6'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book A Demo
                </CTAButton>
            </div>
            <div className="mx-3 my-12 w-[90%]">
                    {/* Video Banner Section with Gradient Background */}
                <div className="relative bg-gradient-to-b from-gray-100 to-white p-4">
                        <div className="relative w-full">
                        <div className="absolute inset-0 bg-radial-gradient rounded-lg z-0"></div>
                            <video
                                className="w-full relative z-20 shadow-[4px_4px_4px_rgba(255,255,255,0.77)]"
                                muted
                                loop
                                autoPlay
                            >
                                <source src={Banner} type="video/mp4" />
                            </video>
                           
                            
                        </div>
                </div>

            </div>

            {/* code section 1 */}

            <div className='w-[80%]'>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"Coding Potential"}/>
                            with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false,
                        }
                    }
                    codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={{
                        codeGradient: "bg-gradient-to-r from-[#1a1e2e] to-[#2a2a1f]", // dark indigo blending into deep olive
                        backgroundColor: "rgba(20, 20, 20, 0.482)", // very dark neutral fallback
                        glow: {
                            backgroundColor: "rgba(253, 224, 71, 0.482)", // subtle golden glow
                            boxShadow:
                            "rgba(253, 224, 71, 0.482) 0px 0px 80px 40px inset, rgba(253, 224, 71, 0.482) 0px 0px 100px 70px inset, rgba(253, 224, 71, 0.725) 0px 0px 100px 40px, rgba(253, 224, 71, 0.725) 0px 0px 140px 90px",
                        },
                    }}



                                        
                />
            </div>

                     {/* code section 2 */}
         <div className='w-[80%]'>
              <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold '>
                            Start
                            <HighlightText text={" coding in seconds "}/>
                        </div>
                    }
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Try It Yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`
                    }
                    codeColor={"text-blue-25"}
                    backgroundGradient={{
                                        codeGradient: "bg-gradient-to-r from-[#1a1e2e] to-[#2a424a]",
                                        backgroundColor: "rgba(57, 143, 205, 0.482)",
                                        glow: {
                                        backgroundColor: "rgba(57, 143, 205, 0.482)",
                                        boxShadow:
                                            "rgba(57, 143, 205, 0.482) 0px 0px 100px 60px inset, rgba(37, 106, 154, 0.482) 0px 0px 140px 90px inset, rgba(57, 143, 205, 0.725) 0px 0px 100px 60px, rgba(37, 106, 154, 0.725) 0px 0px 140px 90px",
                                        },
                                    }}
                 />
           </div>

           <ExploreMore/>
     </div>

     {/* section 2 making */}
     <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

               <div className='w-[80%] max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
               <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-3'>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                        <div>
                            Learn More
                        </div>
                        </CTAButton>
                    </div>
               </div>     



            </div>


            <div className='mx-auto w-[80%] max-w-maxContent flex flex-col items-center justify-center'>

                    <div className='flex flex-row gap-[150px]  mb-10 mt-[95px] '>
                        <div className='text-4xl font-semibold w-[40%]'>
                             Get the Skills you need for a 
                            <HighlightText text={"Job That is in Demand"}/>
                        </div>


                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern SkillNest is the dictates its own terms. Today, to be a comeptitive
                                specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>

                            </CTAButton>
                        </div>

                    </div>

                    <TimelineSection/>

                    <LearningLanguageSection/>     

            </div>

           

     </div>

        {/* section 3 making  */}
            <div className='w-[70%] mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                    <InstructorSection/>

                    <h2 className='text-center text-4xl font-semibold mt-10'>Review from Other Learners</h2>
                    <ReviewSlider/>

            </div>

            {/* footer */}

            <Footer/>

       
      
    </div>
  )
}

export default Home
