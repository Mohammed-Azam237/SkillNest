import User from "../models/User.js";
import Category from "../models/category.js";
import Course from "../models/Course.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import CourseProgress from "../models/CourseProgress.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import mongoose from "mongoose";


//create course handler
export async function createCourse(req, res) {
	console.log("🔥 createCourse route hit");
	try{
		//fetch the data
		const {courseName,courseDescription,whatYouWillLearn,price,category}= req.body;
		
		console.log("🔥 req.body.category:", category);
		//thumbnail image
		console.log("req.files:", req.files);
		const thumbnail = req.files.thumbnailImage;
		console.log("thumbnailImage:", req.files?.thumbnailImage);
		console.log("tempFilePath:", req.files?.thumbnailImage?.tempFilePath);

		//validation
		if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category){
			return res.status(400).json({
				success:"false",
				message:"All field are required",
			});
		}
		//check for instructor
		const userId = req.user.id;
		const instructorDetails = await User.findById(userId);
		console.log("Instructor Details",instructorDetails);

		if(!instructorDetails){
			return res.status(400).json({
				success:false,
				message:'instructor details are not found',
			});
		}
		//check give tag is valid or not
		const categoryDetails = await Category.findById(category);
		console.log("categoryDetails:", categoryDetails)
		if(!categoryDetails){
			return res.status(400).json({
				success:false,
				message:'Tag details are not found',
			});
		}
		//Uplaod Image to cloudinary
		console.log("Thumbnail image received:", req.files?.thumbnailImage);
		console.log("tempFilePath received:", req.files?.thumbnailImage?.tempFilePath);

		// Ensure process.env.FOLDER_NAME is defined
		const folderName = process.env.FOLDER_NAME || "course-thumbnails";
		const thumbnailImage = await uploadImageToCloudinary(thumbnail, folderName);
		console.log("File passed to uploadImageToCloudinary:", thumbnail);
		console.log("File.tempFilePath:", thumbnail?.tempFilePath);


		//crete an entry for new course
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			category: categoryDetails._id,
			thumbnail:thumbnailImage.secure_url,
		});

		//add the new course to the usee schema
		await User.findByIdAndUpdate(
			{_id: instructorDetails._id},
			{
				$push:{
					courses: newCourse._id,
				}
			},
			{new:true},
		);
		//Adding new course to categories
		console.log("Before updating category");
	   const updatedCategory =  await Category.findByIdAndUpdate(
			 category,
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		console.log("Updated Category:", updatedCategory);

		//return res
		return res.status(200).json({
			success:true,
			message:"Course created successfully",
			data:newCourse,
		});
	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success:false,
			message:"Failed to create Course",
			error:error.message,
		});
	}
}
//get all course handler

export async function getAllCourses(req, res) {
	try{
			const allCourses = await Course.find({},{courseName:true,
												price:true,
											thumbnail:true,
											instructor:true,
											ratingAndReview:true,
											studentsEnrolled:true,
											createdAt: true,
											updatedAt: true})
											.populate('instructor')
											.exec();
		   return res.status(200).json({
			success:true,
			message:"Data found Successfully",
			data:allCourses,
		   });
	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success:false,
			message:"Cannot Fetch course data",
			error:error.message,
		});
	}
}

export async function getCourseDetails(req, res) {
	try{
		//get id
		const {courseId} = req.body;
		//find course details
		const courseDetails = await Course.find(
												{_id:courseId})
												.populate(
													{
													path:'instructor',
													populate:{
														path:"additionalDetails",
													},
												}
												)
												.populate('category')
												.populate("ratingAndReviews")
												.populate({
													path:'courseContent',
													populate:{
														path:'subSection',
													},
												})
												.exec()
			//validation
			if(!courseDetails){
				return res.status(400).json({
					success:false,
					message:`coudn't find the course with ${courseId}`
				})
			}
			return res.status(200).json({
				success:true,
				message:"Course detatils fetch successfully",
				data:courseDetails,
			})
		
		
	}
	catch(error){
		console.log(error);
		return res.status(500).json({
			success:false,
			message:error.message,
		})
	}
}

// Function to get all courses of a particular instructor
export async function getInstructorCourses(req, res) {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Find all courses of the instructor
		const allCourses = await Course.find({ instructor: userId },
			);

		// Return all courses of the instructor
		res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		// Handle any errors that occur during the fetching of the courses
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch courses",
			error: error.message,
		});
	}
}





//Edit Course Details
export async function editCourse(req, res) {
	try {
	  const { courseId } = req.body
	  const updates = req.body
	  const course = await Course.findById(courseId)
  
	  if (!course) {
		return res.status(404).json({ error: "Course not found" })
	  }
  
	  // If Thumbnail Image is found, update it
	  if (req.files) {
		console.log("thumbnail update")
		const thumbnail = req.files.thumbnailImage
		const thumbnailImage = await uploadImageToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		)
		course.thumbnail = thumbnailImage.secure_url
	  }
  
	  // Update only the fields that are present in the request body
	  for (const key of Object.keys(updates)) {
		if (key === "tag" || key === "instructions") {
		  course[key] = JSON.parse(updates[key])
		} else {
		  course[key] = updates[key]
		}
	  }
	  
  
	  await course.save()
  
	  const updatedCourse = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  })
	} catch (error) {
	  console.error(error)
	  res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  })
	}
  }




  //get full course details
export async function getFullCourseDetails(req, res) {
	try {
		if (!req.user || !req.user.id) {
			return res.status(401).json({
			  success: false,
			  message: "Unauthorized - user not logged in",
			});
		  }
	  const { courseId } = req.body
	  const userId = req?.user?.id
	  if (!userId) {
		return res.status(401).json({
		  success: false,
		  message: "Unauthorized - User not logged in",
		});
	  }
	  const courseDetails = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()

		console.log("➡️ courseId from req.body:", courseId);
		console.log("➡️ userId from decoded token:", userId);
		
  // Helper to safely convert to ObjectId only if needed
  const toObjectId = (id) => {
	if (typeof id === "string") return new mongoose.Types.ObjectId(id);
	return id;
  };

  let courseProgress = await CourseProgress.findOne({
	courseID: toObjectId(courseId),
	userId: toObjectId(userId),
  });

	  console.log("courseProgress : ", courseProgress);

	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${courseId}`,
		});
	  }

	  let totalDurationInSeconds = 0;
	  courseDetails.courseContent.forEach((content) => {
		content.subSection.forEach((subSection) => {
		  const timeDurationInSeconds = parseInt(subSection.timeDuration);
		  totalDurationInSeconds += timeDurationInSeconds;
		});
	  });

	  const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		  totalDuration,
		  completedVideos: courseProgress && Array.isArray(courseProgress.completedVideos)
			? courseProgress.completedVideos
			: ["none"],
		  courseProgressId: courseProgress ? courseProgress._id : null,
		},
	  });
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }


//Delete Course
export async function deleteCourse(req, res) {
	try {
	  const { courseId } = req.body
	  // Find the course
	  const course = await Course.findById(courseId)
	  if (!course) {
		return res.status(404).json({ message: "Course not found" })
	  }
  
	  // Unenroll students from the course
	  const studentsEnrolled = course.studentEnrolled
	  for (const studentId of studentsEnrolled) {
		await User.findByIdAndUpdate(studentId, {
		  $pull: { courses: courseId },
		})
	  }
  
	  // Delete sections and sub-sections
	  const courseSections = course.courseContent
	  for (const sectionId of courseSections) {
		// Delete sub-sections of the section
		const section = await Section.findById(sectionId)
		if (section) {
		  const subSections = section.subSection
		  for (const subSectionId of subSections) {
			await SubSection.findByIdAndDelete(subSectionId);
		  }
		}
  
		// Delete the section
		await Section.findByIdAndDelete(sectionId)
	  }
  
	  // Delete the course
	  await Course.findByIdAndDelete(courseId)

	  //Delete course id from Category
	  await Category.findByIdAndUpdate(course.category._id, {
		$pull: { courses: courseId },
		 })
	
	//Delete course id from Instructor
	await User.findByIdAndUpdate(course.instructor._id, {
		$pull: { courses: courseId },
		 })
  
	  return res.status(200).json({
		success: true,
		message: "Course deleted successfully",
	  })
	} catch (error) {
	  console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
	}
  }



  //search course by title,description and tags array
export async function searchCourse(req, res) {
	try {
	  const  { searchQuery }  = req.body
	//   console.log("searchQuery : ", searchQuery)
	  const courses = await Course.find({
		$or: [
		  { courseName: { $regex: searchQuery, $options: "i" } },
		  { courseDescription: { $regex: searchQuery, $options: "i" } },
		  { tag: { $regex: searchQuery, $options: "i" } },
		],
  })
  .populate({
	path: "instructor",  })
  .populate("category")
  .populate("ratingAndReviews")
  .exec();

  return res.status(200).json({
	success: true,
	data: courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}		
}					

//mark lecture as completed
export async function markLectureAsComplete(req, res) {
	try {
		const { courseId, subSectionId, userId } = req.body;
		if (!courseId || !subSectionId || !userId) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		// Find course progress for this user and course
		// Helper to safely convert to ObjectId only if needed
		const toObjectId = (id) => {
			if (typeof id === "string") return new mongoose.Types.ObjectId(id);
			return id;
		};

		const courseProgress = await CourseProgress.findOne({
			userId: toObjectId(userId),
			courseID: toObjectId(courseId),
		});

		if (!courseProgress) {
			return res.status(404).json({
				success: false,
				message: "Course progress not found for this user",
			});
		}

		// Ensure completedVideos is an array
		if (!Array.isArray(courseProgress.completedVideos)) {
			courseProgress.completedVideos = [];
		}

		// Check if already marked as complete
		if (courseProgress.completedVideos.includes(subSectionId)) {
			return res.status(400).json({
				success: false,
				message: "Lecture already marked as complete",
			});
		}

		// Add the subsection ID to completedVideos and save
		courseProgress.completedVideos.push(subSectionId);
		await courseProgress.save();

		return res.status(200).json({
			success: true,
			message: "Lecture marked as complete",
			courseProgressId: courseProgress._id,
			completedVideos: courseProgress.completedVideos,
		});
	} catch (error) {
		console.error("Error in markLectureAsComplete:", error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
  
  