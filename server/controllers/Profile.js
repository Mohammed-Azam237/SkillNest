import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import CourseProgress from "../models/CourseProgress.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import mongoose from "mongoose";

export const updateProfile = async(req,res)=>{
    try{
        //get data
        const{gender,dateOfBirth="",contactNumber,about=""}= req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //find the profile
        const userDetails= await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //updating profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender= gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile Upated Successfully',
            profileDetails,
        });
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:'internal server issue',
            error:error.message,
        });
    }
}
//deleteAccount

export const deleteAccount = async(req ,res)=>{
    try{
            //get id
            const id = req.user.id;
            //validation
            const userDetails = await User.findById(id);
            if(!userDetails){
                return res.status(400).json({
                    success:false,
                    message:'User not found',
                });
            }
            //delete the profile
            await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
            //delete the user corresponding to it
            await User.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success:true,
                message:"User deleted successfully",
            })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        });
    }
}

export const getAllUserDetails = async(req,res)=>{
    try{
        //get id
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"User data fetch successfully",
            data:userDetails
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export const getEnrolledCourses=async (req,res) => {
    try {
        const userId = (typeof req.user.id === 'string' && mongoose.Types.ObjectId.isValid(req.user.id))
            ? new mongoose.Types.ObjectId(req.user.id)
            : req.user.id;
        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            }).exec();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `User not found : ${userDetails}`,
            });
        }
        userDetails = userDetails.toObject();
        // Use Promise.all for parallel CourseProgress queries
        await Promise.all(userDetails.courses.map(async (course) => {
            let totalDurationInSeconds = 0;
            let SubsectionLength = 0;
            // Ensure courseContent is always an array
            if (!Array.isArray(course.courseContent)) {
                course.courseContent = [];
            }
            for (const section of course.courseContent) {
                // Ensure subSection is always an array
                if (!Array.isArray(section.subSection)) {
                    section.subSection = [];
                }
                section.subSection.forEach((curr, idx) => {
                    // Debug log for each sub-section's timeDuration
                    console.log(`Course: ${course.courseName}, Section: ${section._id}, SubSection[${idx}]:`, curr);
                    const duration = Number(curr.timeDuration);
                    if (!isNaN(duration) && duration > 0) {
                        totalDurationInSeconds += duration;
                    }
                });
                SubsectionLength += section.subSection.length;
            }
            course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            // Find course progress and add completedVideos
            const courseProgress = await CourseProgress.findOne({
                userId: userId,
                courseID: (typeof course._id === 'string' && mongoose.Types.ObjectId.isValid(course._id))
                    ? new mongoose.Types.ObjectId(course._id)
                    : course._id
            });
            const completedVideos = courseProgress?.completedVideos || [];
            course.completedVideos = completedVideos;
            let courseProgressCount = completedVideos.length;
            if (SubsectionLength === 0) {
                course.progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                let percent = (courseProgressCount / SubsectionLength) * 100;
                course.progressPercentage = isNaN(percent) ? 0 : Math.round(percent * multiplier) / multiplier;
            }
        }));
        console.log("Enrolled courses:", userDetails.courses);
        return res.status(200).json({
            success: true,
            courses: userDetails.courses,
            message: "Enrolled courses fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
  
  

//updateDisplayPicture
export const updateDisplayPicture = async (req, res) => {
    console.log("🎯 updateDisplayPicture controller HIT");
    console.log("TOKEN:", req.user);
    console.log("FILES:", req.files);
    console.log("👉 req.files: ", req.files);
    console.log("👉 req.files.pfp: ", req.files?.pfp);
    console.log("👉 req.files.pfp.tempFilePath: ", req.files?.pfp?.tempFilePath);
    try {

        const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    console.log("Files:", req.files);
    const image = req.files?.pfp;
    console.log(image);
    if (!image) {
        return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
    const uploadDetails = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME
    );
    console.log("Upload details from cloudinary",uploadDetails);

    const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }



}

//instructor dashboard
export const instructorDashboard = async (req, res) => {
    try {
        const id = req.user.id;
        const courseData = await Course.find({ instructor: id });
        const courseDetails = courseData.map((course) => {
            let totalStudents = course?.studentEnrolled?.length || 0;
            let totalRevenue = course?.price ? course.price * totalStudents : 0;
            const courseStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudents,
                totalRevenue,
            };
            return courseStats;
        });
        res.status(200).json({
            success: true,
            message: "Instructor dashboard data fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

