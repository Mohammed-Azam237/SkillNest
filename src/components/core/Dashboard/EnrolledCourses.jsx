import React, { useEffect, useState } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router';

const EnrolledCourses = () => {

    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth)
    console.log("📢 Token used in API:", token);


    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
          const response = await getUserEnrolledCourses(token, dispatch);
          console.log("📦 Enrolled Courses API Response:", response);
          // Defensive: ensure courses is always an array
          if (Array.isArray(response?.courses)) {
            setEnrolledCourses(response.courses);
          } else {
            setEnrolledCourses([]);
          }
        } catch (error) {
          console.error("❌ Unable to fetch enrolled courses:", error?.response?.data || error.message || error);
          setEnrolledCourses([]);
        }
      };
      

    useEffect(()=>{
        getEnrolledCourses();
    },[])
  return (
    <div className='text-white mx-auto w-11/12 max-w-[1000px] py-10'>

        <div className='text-3xl text-richblack-50'>Enrolled Courses</div>
        {
            enrolledCourses === null ? (<div>
                Loading...
            </div>)
            : !enrolledCourses.length ? (<p className='grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any course yet</p>)
            : (
                <div className='my-8 text-richblack-5'>
                    <div className='flex rounded-t-lg bg-richblack-500 '>
                        <p className='w-[45%] px-5 py-3'>Course Name</p>
                        <p className='w-1/4 px-2 py-3'>Duration</p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>

                    {/* card section below */}
                    {
                        enrolledCourses.map((course, index)=>(
                            <div key={index} onClick={() => {
                                console.log("🧪 Clicked Course:", course);
                                // Defensive: ensure courseContent is an array and has at least one section
                                const section = Array.isArray(course.courseContent) ? course.courseContent[0] : null;
                                const subSection = section && Array.isArray(section.subSection) ? section.subSection[0] : null;

                                if (!section || !subSection) {
                                    console.warn("🚫 Navigation prevented: Missing section or sub-section.");
                                    return;
                                }

                                navigate(`view-course/${course._id}/section/${section._id}/sub-section/${subSection._id}`);
                            }}
                            className='flex items-center border border-richblack-700 rounded-none'>
                                <div className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'>
                                    <img  className='h-14 w-14 rounded-lg object-cover' src={course.thumbnail}/>
                                    <div  className='flex max-w-xs flex-col gap-2'>
                                        <p className='font-semibold'>{course.courseName}</p>
                                        <p className='text-xs text-richblack-300 hidden md:block'>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div  className='w-1/4 px-2 py-3'>
                                    {course?.totalDuration}
                                </div>

                                <div className='flex w-1/5 flex-col gap-2 px- py-3'>
                                    <p>Progress:{course.progressPercentage} %</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses
