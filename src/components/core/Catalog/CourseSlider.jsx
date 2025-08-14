import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation";
import {Autoplay ,FreeMode,Navigation, Pagination,Mousewheel, Keyboard}  from 'swiper/modules'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

import CourseCard from "./CourseCard"

const CourseSlider = ({Courses}) => {
    console.log("🔥 Slider Courses:", Courses);
    
  return (
    <>
        {
            Courses?.length ? (
                <div className="relative group">
                    <Swiper
                    slidesPerView={1}
                    loop={true}  
                    spaceBetween={200}
                    
                    modules={[Pagination,Autoplay,Navigation]}
                    pagination={{dynamicMainBullets:true}}
                    className='mySwiper'
                    autoplay={{
                        delay:2500,
                        disableOnInteraction:false,
                    }}
                    
                    // breakpoints={{
                    //     1024:{slidesPerView:3,}
                    // }}
                    >
                        {
                            Courses?.map((course, index)=> (
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Height={"lg:h-[250px] h-[100px]"} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                    {/* Netflix-like arrows */}
                    <div className="swiper-button-prev !text-yellow-50 !hidden group-hover:!flex !bg-black/60 hover:!bg-black/80 !p-3 !rounded-full !z-10 !absolute !top-1/2 !-translate-y-1/2 !left-2 transition-all duration-300"></div>
                    <div className="swiper-button-next !text-yellow-50 !hidden group-hover:!flex !bg-black/60 hover:!bg-black/80 !p-3 !rounded-full !z-10 !absolute !top-1/2 !-translate-y-1/2 !right-2 transition-all duration-300"></div>
                </div>
                
            ) : (
                
              <div className='flex gap-4 overflow-hidden'>
                <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                <div className=''>
                  <Skeleton  className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                  <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md"/>
                </div>
              </SkeletonTheme>
                <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                <div className=''>
                  <Skeleton  className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                  <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md"/>
                </div>
              </SkeletonTheme>
                <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                <div className=''>
                  <Skeleton  className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                  <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md"/>
                </div>
              </SkeletonTheme>
                </div>
                
            )

        }
    </>
  )
}

export default CourseSlider
