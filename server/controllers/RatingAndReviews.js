const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const mongoose = require("mongoose");



exports.createRating = async(req,res)=>{
    try{
        //first get the user id because user should be logged in when he/she giving rating and review
        const userId = req.user.id;
        //fetch the data from req body
        const {courseId,rating ,review}= req.body;
        //check if the user is already enrolled or not in a course
        const courseDetails = await Course.findOne(
                                                     { _id:courseId,
                                                    studentEnrolled: {$elemMatch: {$eq: userId} }, 
                                                });
        //do the validation and check if the data of a enrolled one is there or not
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if the user already reviewed the course 
        const alreadyReviewed = await RatingAndReview.findOne(
                                                            {id:userId,
                                                            course:courseId,}
        )
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'COurse is already reviewed by the user',
            });
        }
        //if not then create a new rating review
        const ratingReview = await RatingAndReview.create({
                                                            rating,review,
                                                            course:courseId,
                                                            user:userId,
        });
        //update the course with this rating/review
       const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviews:ratingReview._id,
                                            }
                                        },
                                        {new:true}   );
        console.log(updatedCourseDetails);
        //return resposne
        return res.status(200).json({
            success:true,
            message:'Rating and review successfully',
            ratingReview,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//getAverageRating
exports.getAverageRating = async(req,res)=>{
    try{
            //get the courseid first 
            const courseId = req.query.courseId;
            // calculate the avg rating using aggregate function
            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course:new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating :{$avg:"$rating"},
                    }
                }
            ])
            //return rating
            if(result.length>0){
                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })
            }
            //if no rating/review
            return res.status(200).json({
                success:true,
                message:'Average rating is 0, no rating given till now',
                averageRating:0,
            })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//get all ratingand reviews now 
exports.getAllRatings = async(req,res)=>{
    try{
            const allReviews = await RatingAndReview.find({})
                                        .sort({rating:"desc"})
                                        .populate({
                                            path:"user",
                                            select: "firstName lastName email image",
                                        })
                                        .populate({
                                            path:"course",
                                            select:"courseName",
                                        })
                                        .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews successfully",
                data:allReviews,
            });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}