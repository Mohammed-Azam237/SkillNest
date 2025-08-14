const Category = require("../models/category");
const Course = require("../models/Course");

//create tag ka handelrr banare 

exports.createCategory = async(req,res)=>{
    try{
        //fetch karo data from req ki body
        const {name,description}= req.body
        //validation
        if(!name|| !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required '
            })
        }
        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        //return res
        return res.status(200).json({
            success:true,
            message:'Category created successfully',
        });
    }
    catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            });
    }

}

// handler function for all tags

exports.showAllCategory = async(req,res)=>{
    try{
        const allCategory = await Category.find({}, {name:true,description:true});
        res.status(200).json({
            success:true,
            message:'All Category returned successfully',
             data:allCategory,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		


		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)          //populate instuctor and rating and reviews from courses
			.populate({path:"courses",match:{ status: { $in: ["Published", "Draft"] } },populate:([{path:"instructor"},{path:"ratingAndReviews"}])})
			.exec();
		// console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		// Get different category (one that is not the selected one)
		const otherCategories = await Category.find({
			_id: { $ne: categoryId },
		}).populate({
			path: "courses",
			match: { status: "Published" },
			populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
		});

		const differentCategory = otherCategories.length > 0 ? otherCategories[0] : null;

		// Get top-selling courses from all categories
		const allCategories = await Category.find().populate({
			path: "courses",
			match: { status: "Published" },
			populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
		});

		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		// Final response structure
		return res.status(200).json({
			success: true,
			data: {
				selectedCategory: {
					_id: selectedCategory._id,
					name: selectedCategory.name,
					description: selectedCategory.description,
					courses: selectedCategory.courses,
				},
				differentCategory: differentCategory
					? {
							_id: differentCategory._id,
							name: differentCategory.name,
							description: differentCategory.description,
							courses: differentCategory.courses,
					  }
					: null,
				mostSellingCourses: mostSellingCourses,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

//add course to category
exports.addCourseToCategory = async (req, res) => {
	const { courseId, categoryId } = req.body;
	// console.log("category id", categoryId);
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(category.courses.includes(courseId)){
			return res.status(200).json({
				success: true,
				message: "Course already exists in the category",
			});
		}
		category.courses.push(courseId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}