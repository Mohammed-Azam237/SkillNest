const {instance}= require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {paymentSuccess} = require("../mail/templates/paymentSuccess");
const {default:mongoose} = require("mongoose")
const crypto = require("crypto")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const CourseProgress = require("../models/CourseProgress");

//initiate the razorpay order
exports.capturePayment = async(req,res)=>{

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({success:false, message:"Please Provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            console.log("TYPE OF COURSEID", typeof(course_id));
            console.log("PRINTING", course_id);
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({success:false, message:"Student is already Enrolled"})
            }

            totalAmount +=course.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    const options = {
        amount : totalAmount * 100,
        currency:"INR",
        receipt : Math.random(Date.now()).toString(),


    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch (error) {
        console.error("RAZORPAY ERROR >>>", error); // 👈 Add this
        return res.status(500).json({ success: false, message: "Could not initiate Order" });
      }
      
}

//verify payment
console.log("✅ Inside verifyPayment route FILE");

exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    console.log("🧾 razorpay_order_id:", razorpay_order_id);
    console.log("🧾 razorpay_payment_id:", razorpay_payment_id);
    console.log("🧾 razorpay_signature:", razorpay_signature);

    if(!razorpay_order_id ||
        !razorpay_payment_id||
        !razorpay_signature|| !courses|| !userId){
            return res.status(200).json({success:false, message:"Payment Failed"});
        }


        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");
            console.log("🔑 expectedSignature:", expectedSignature);
            console.log("🔐 receivedSignature:", razorpay_signature);

            if(expectedSignature === razorpay_signature){
                console.log("✅ Signature matched. Proceeding to enroll student...");
                //enroll the student
                const courseProgressIds = await enrollStudents(courses, userId, res);
                console.log("🎯 Final courseProgressIds before sending response:", courseProgressIds);


                return res.status(200).json({success:true, message:"Payment Verified", courseProgressIds: courseProgressIds || [],});
            }
            console.log("❌ Signature mismatch");
           
            

}



const enrollStudents = async (courses, userId) => {
    console.log("🔥 enrollStudents() CALLED");

    const courseProgressIds = [];

    if (!courses || !userId) {
        console.log("⚠️ Missing courses or userId");
        return [];
    }

    for (const courseId of courses) {
        try {
            const course = await Course.findById(courseId);
            if (!course) continue;

            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                console.log("❌ Course not found:", courseId);
                continue;
            }

            const courseProgress = await CourseProgress.create({
                courseID: course._id,
                userId: userId,
                completedVideos: [],
            });
            console.log("✅ CourseProgress created with ID:", courseProgress._id);

            courseProgressIds.push(courseProgress._id);

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            console.log("✅ Created CourseProgress:", courseProgress._id.toString());
            console.log("✅ For courseID:", courseProgress.courseID.toString());
            console.log("✅ For userId:", courseProgress.userId.toString());

            // Email logic
            if (enrolledStudent && enrolledStudent.email) {
                console.log("📧 Sending email to:", enrolledStudent.email);
                await mailSender(
                    enrolledStudent.email,
                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
                );
            }

        } catch (error) {
            console.log("❌ Error in enrollStudents loop:", error);
            // Don't return here — just continue to the next course
        }
    }

    // ✅ Always return this to the caller
    console.log("📦 Final courseProgressIds array:", courseProgressIds);
    return courseProgressIds;
};


exports.sendPaymentSuccessEmail = async (req, res) => {
    const {amount,paymentId,orderId} = req.body;
    const userId = req.user.id;
    if(!amount || !paymentId) {
        return res.status(400).json({
            success:false,
            message:'Please provide valid payment details',
        });
    }
    try{
        const enrolledStudent =  await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Skill Nest Payment successful`,
            paymentSuccess(amount/100, paymentId, orderId, enrolledStudent.firstName, enrolledStudent.lastName),
        );
}
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

