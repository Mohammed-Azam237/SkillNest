const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req,res)=>{
    try{
        //fetch data
    const{sectionName,courseId}=req.body;
    //validation
    if(!sectionName||!courseId){
        return res.status(400).json({
            success:false,
            message:'Missing Properties',
        });
    }
    //create section
    const newSection = await Section.create({sectionName});
    //upadte karo 
    const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push:{
                                                            courseContent: newSection._id,
                                                        }
                                                    },
                                                    {new:true},
    )
    .populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        },
    })
    .exec();

    return res.status(200).json({
        success:true,
        message:'Section created Successfully',
        updatedCourseDetails,
    })

    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:'Internal server error',
            error:error.message,
        })
    }
}


//update sections

exports.updateSection = async(req,res)=>{
    try{
        //fetch data
        const{sectionName,sectionId,courseId} = req.body;
        //validation
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
        //return res
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            updatedCourse,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update section, please try again ',
            error: error.message,
        });
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        //id leke aao
        const {courseId}=req.body;
        const {sectionId }= req.body;
        //findby id and delete it 
        await Section.findByIdAndDelete(sectionId);
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId }
          });
          
        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
        
        //return res
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            updatedCourse,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete section, please try again ',
            error: error.message,
        });
    }
}