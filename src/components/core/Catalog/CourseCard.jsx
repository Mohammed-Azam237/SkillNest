import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
    return (
        <div className="bg-richblack-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-100 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
          <Link to={`/courses/${course._id}`}>
            {/* Thumbnail Image */}
            <div className="w-full aspect-[8/3] bg-richblack-700 overflow-hidden rounded-t-2xl">
                    <img
                        src={course?.thumbnail}
                        alt="Course Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
            </div>

      
            {/* Course Details */}
            <div className="flex flex-col gap-2 px-4 py-3">
              {/* Course Title */}
              <p className="text-base md:text-lg font-semibold text-richblack-5 truncate">
                {course?.courseName}
              </p>
      
              {/* Instructor */}
              <p className="text-sm text-richblack-300">
                By <span className="text-yellow-50 font-medium">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </span>
              </p>
      
              {/* Rating */}
              <div className="flex items-center gap-x-2 text-yellow-50 text-sm">
                <span>{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className="text-richblack-300 hidden md:block">
                  ({course?.ratingAndReviews?.length} Ratings)
                </span>
              </div>
      
              {/* Price */}
              <p className="text-base font-semibold text-richblack-5">
                ₹{course?.price}
              </p>
            </div>
          </Link>
        </div>
      );
    }      

export default Course_Card
