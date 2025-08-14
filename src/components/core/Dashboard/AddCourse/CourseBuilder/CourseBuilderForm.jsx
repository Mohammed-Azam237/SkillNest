import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {GrAddCircle} from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux';
import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import {toast} from "react-hot-toast"
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state)=> state.course);
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.auth);
  const [loading, setLoading] = useState(false)

  const onSubmit =async (data)=>{
      setLoading(true);
      let result;

      if(editSectionName) {
        //we are diting the section name
        result = await updateSection(
          {
            sectionName : data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
          }, token
        )
      }
      else{
        result= await createSection({
          sectionName: data.sectionName,
          courseId: course._id,
        }, token)
      }

      //update the values
      if(result) {
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName", "")
      }
      //loading false
      setLoading(false);
  }

  const cancelEdit = ()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }
  
  const goBack = ()=>{
      dispatch(setStep(1));
      dispatch(setEditCourse(true));

  }
  const goToNext = ()=>{
    if(course.courseContent.length ===0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section)=> section.subSection.length===0)){
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  }

  const handleChangedEditSectionName = (sectionId, sectionName)=>{
    if(editSectionName===sectionId)
    {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }


  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-richblack-5" htmlFor='sectionName'>Section name <sup className="text-pink-200">*</sup></label>
          <input
            id= 'sectionName'
            placeholder='Add Section Name'
            {...register("sectionName", {required:true})}
            className='w-full form-style max-w-maxContent text-black'
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
          )}
        </div>

        <div className='mt-10 max-w-maxContent w-full flex'>
          <IconBtn
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}

          >
          <GrAddCircle className=' text-black' size={20}/>

          </IconBtn>
          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView  handleChangedEditSectionName={handleChangedEditSectionName}/>
      )}

      <div className='flex justify-end gap-x-3 mt-10'>
      <button
      onClick={goBack}
      className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
      >
        Back
      </button>
      <button
          onClick={goToNext}
          className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
        >
          <span className="false">Next</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>

      </div>

    </div>
  )
}

export default CourseBuilderForm
