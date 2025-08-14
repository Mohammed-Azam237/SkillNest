import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiNinjaStar } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component"

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col space-y-6">
      {cart.map((course, index) => (
        <div
          key={index}
          className="w-full rounded-2xl border border-richblack-600 bg-gradient-to-br from-richblack-800/80 to-richblack-900/60 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_6px_32px_rgba(255,255,255,0.08)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            {/* Left: Thumbnail & Info */}
            <div className="flex flex-1 flex-col gap-3 xl:flex-row">
              <img
                className="h-[100px] w-[180px] md:h-[148px] md:w-[220px] rounded-xl object-cover ring-2 ring-yellow-100/20 hover:ring-yellow-100/50 transition-all duration-200"
                src={course?.thumbnail}
                alt={course?.courseName}
              />

              <div className="flex flex-col space-y-1">
                <p className="text-xl font-bold text-richblack-5 poppins">{course?.courseName}</p>
                <p className="text-sm text-richblack-300 italic tracking-wide">{course?.category?.name}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-yellow-100 font-semibold">4.8</span>
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="#facc15"
                    emptyIcon={<GiNinjaStar />}
                    fullIcon={<GiNinjaStar />}
                  />
                  <span className="text-richblack-400 text-sm">
                    {course?.ratingAndReviews?.length} Ratings
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Remove & Price */}
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-2 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-pink-200 hover:bg-richblack-600 hover:text-pink-100 text-base font-medium transition-all duration-200"
              >
                <RiDeleteBin6Line size={18} />
                <span>Remove</span>
              </button>

              <p className="mt-4 text-2xl font-bold text-yellow-100 tracking-wide drop-shadow-sm">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses
