const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

//create subsection

exports.createSubSection = async(req,res)=>{
    try{
        const{sectionId,title,description,courseId}=req.body
        console.log("sectionId:", sectionId);
        console.log("title:", title);
        console.log("description:", description);
        console.log("courseId:", courseId);
        console.log("req.files:", req.files);
        console.log("videoFile:", req.files?.videoFile);

        //extract file/video
        const video = req.files.videoFile;
        //validation
        if(!sectionId||!title||!description||!courseId||!video){
            return res.status(400).json({
                success:false,
                message:'All fileds required',
            });
        }
        const ifsection= await Section.findById(sectionId);
        if (!ifsection) {
            return res
                .status(404)
                .json({ success: false, message: "Section not found" });
        }
        //upload to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_VIDEO);

        // Extract video duration using fluent-ffmpeg
        const ffmpeg = require('fluent-ffmpeg');
        let durationInSeconds = 0;
        // Use tempFilePath if available, else use uploaded url (for remote files, you may need to download first)
        const videoPath = video.tempFilePath || video.path;
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath).ffprobe((err, data) => {
                if (err) {
                    console.error('Error extracting video duration:', err);
                    durationInSeconds = 0;
                    return resolve();
                }
                durationInSeconds = Math.round(data.format.duration) || 0;
                resolve();
            });
        });

        //create asubsection
        const subSectionDetails = await SubSection.create({
            title: title,
            description: description,
            videoUrl: uploadDetails.secure_url,
            timeDuration: durationInSeconds,
        });
        //update section with this subsection objectaId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                        {$push:{
                                                                            subSection:subSectionDetails._id,
                                                                        }},
                                                                        {new:true}).populate('subSection');
         const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();                                                            
           return res.status(200).json({
            success:true,
            message:'Sub section created successfully',
            data: updatedCourse,
           });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Subsection not created",
            error:error.message,
        })
    }
}


// UPDATE a sub-section
exports.updateSubSection = async (req,res) => {

    try {
        // Extract necessary information from the request body
        const { SubsectionId, title , description,courseId } = req.body;
        const video = req?.files?.videoFile;

        // 🛠️ Fetch the current sub-section
        const subSection = await SubSection.findById(SubsectionId);
        if (!subSection) {
          return res.status(404).json({ success: false, message: "SubSection not found" });
        }
        
        let uploadDetails = null;
        // Upload the video file to Cloudinary
        if(video){
         uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_VIDEO
        );
        }

        // Update fields if they are provided
    if (title) subSection.title = title;
    if (description) subSection.description = description;
    if (uploadDetails?.secure_url) subSection.videoUrl = uploadDetails.secure_url;

    // Save changes
    await subSection.save();

    // Fetch and return updated course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error("Error updating sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
        

}


exports.deleteSubSection = async(req, res) => {

console.log("🔥 deleteSubSection hit");
console.log("BODY:", req.body);
    try {
        const {subSectionId,courseId} = req.body;
        const sectionId=req.body.sectionId;
    if(!subSectionId || !sectionId){
        return res.status(400).json({
            success: false,
            message: "all fields are required",
        });
    }
    const ifsubSection = await SubSection.findById({_id:subSectionId});
    const ifsection= await Section.findById({_id:sectionId});
    if(!ifsubSection){
        return res.status(400).json({
            success: false,
            message: "Sub-section not found",
        });
    }
    if(!ifsection){
        return res.status(404).json({
            success: false,
            message: "Section not found",
        });
    }
    await SubSection.findByIdAndDelete({ _id:subSectionId});
    await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});
    const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
    const updateSubSection = await Section.findById(sectionId).populate("subSection")
    return res.status(200).json({ success: true, message: "Sub-section deleted", data:updateSubSection,updatedCourse});
        
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
        

    }
}