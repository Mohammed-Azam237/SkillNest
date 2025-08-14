import React from 'react'
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import IconBtn from '../../common/IconBtn'
import { FaChevronLeft } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const VideoDetailsSidebar = ({setReviewModal}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActive, setVideoActive] = useState("");
  const {courseId, sectionId, subsectionId} = useParams();
  const {courseSectionData, courseEntireData, completedLectures, totalNoOfLectures} = useSelector(state => state.viewCourse);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    if(!courseSectionData.length) return;
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => subSection?._id === subsectionId);
    if(currentSectionIndex === -1 || currentSubSectionIndex === -1) return;
    const activesubsectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
    
    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideoActive(activesubsectionId);
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 relative z-20">
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className='flex w-full items-center justify-between '>
          <div className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90'>
            <FaChevronLeft className='cursor-pointer md:block' onClick={() => {
              navigate(`/dashboard/enrolled-courses`);
            }}/>
          </div>
          <IconBtn text={"Review"} onclick={() => { setReviewModal(true) }}/>
        </div>
        <div className='flex flex-col'>
          <p>My Courses</p>
          <p className='text-sm font-semibold text-richblack-500'>
            {completedLectures?.length} of {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>
      <div className='h-[calc(100vh - 5rem)] overflow-y-auto px-2'>
        {
          courseSectionData?.map((section, index) => (
            <details key={index} className='appearance-none text-richblack-5 detailanimatation'>
              <summary className='mt-2 cursor-pointer text-sm text-richblack-5 appearance-none'>
                <div className='flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                  <p className='w-[70%] font-semibold'>{section?.sectionName}</p>
                  <div className='flex items-center gap-3'>
                    <MdOutlineKeyboardArrowDown className='arrow'/>
                  </div>
                </div>
              </summary>
              {
                section?.subSection.map((subSection) => (
                  <div key={subSection?._id} className='transition-[height] duration-500 ease-in-out'>
                    <div onClick={() => {
                      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${section?._id}/sub-section/${subSection?._id}`);
                    }} className={`${subSection?._id === videoActive ? "bg-yellow-200" : "bg-richblack-50"} cursor-pointer items-baseline flex gap-3 px-5 py-2 font-semibold text-richblack-800 relative border-b-[1px] border-richblack-600`}>
                      <div className="checkbox-wrapper-19 absolute bottom-1">
                        <input readOnly={true} checked={completedLectures?.includes(subSection?._id)} type="checkbox" />
                        <label className="check-box"></label>
                      </div>
                      <p className='ml-6'>{subSection?.title}</p>
                    </div>
                  </div>
                ))
              }
            </details>
          ))
        }
      </div>
    </div>
  )
}

export default VideoDetailsSidebar
