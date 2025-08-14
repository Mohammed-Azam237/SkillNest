import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import {toast} from "react-hot-toast"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice";

 // Adjust the import path as necessary
//import { sendPaymentSuccessEmail } from "./sendPaymentSuccessEmail"; // Adjust the import path
import { setCourseProgressId } from "../../slices/viewCourseSlice"; // or the correct slice path


//import { verifyPayment } from "../../../server/controllers/Payments";



const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;


function loadScript(src){

    return new Promise((resolve)=>{
      const script = document.createElement("script");
      script.src = src;
      
      script.onload=()=>{
        resolve(true);
      }
      script.onerror=()=>{
        resolve(false);
      }
      document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch){
  const toastId = toast.loading("Loading...");

  try{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if(!res){
      toast.error("Razorpay failed to load");
      return;
    }

    //initialte the order
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
                                            {courses},
                                            {
                                              Authorization: `Bearer ${token}`,
                                            })
     if(!orderResponse.data.success){
      throw new Error(orderResponse.data.message);
     }   
     console.log("Printing orderResponse", orderResponse);
     console.log("RAZORPAY KEY:", import.meta.env.VITE_RAZORPAY_KEY);

     //options
     const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount:`${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name:"SkillNest",
      description:"Thankyou for Purchasing the Course",
      image:rzpLogo,
      profile:{
        name:`${userDetails.firstName}`,
        email:userDetails.email
      },
      handler: function(response){
        //send successfull mail
        sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token);
        //verify payment lala
        const courseIds = courses.map(course => typeof course === "string" ? course : course._id);
  verifyPayment({ ...response, courses: courseIds }, token , navigate, dispatch);
      }
     }

     const paymentObject = new window.Razorpay(options);
     paymentObject.open();
     paymentObject.on("payment.failed", function(response){
      toast.error("oops , payment failed");
      console.log(response.error);
     })
  }
  catch(error){
      console.log("PAYMENT API ERROR............",error);
      toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response, amount, token){
  try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
          orderId: response.razorpay_order_id,
          paymentId:response.razorpay_payment_id,
          amount,
        },{
          Authorization: `Bearer ${token}`
        })
  }
  catch(error){
      console.log("PAYMENT SUCCESS EMAIL ERROR.....", error)
  }
}

//verify payment

async function verifyPayment (bodyData,token,navigate,dispatch,setPaymentLoading) {
  const toastId = toast.loading("Please wait while we verify your payment");
  console.log("verifypayment -> courses", bodyData.courses);
 
  try{
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData,{
        Authorization: ` Bearer ${token}`,
      })

      if(!response.data.success){
          throw new Error(response.data.message);
      }
      const courseProgressIds = response.data.courseProgressIds || [];
      if (courseProgressIds.length > 0) {
        dispatch(setCourseProgressId(courseProgressIds));
        console.log("📦 Dispatched CourseProgressIds:", courseProgressIds);
      } else {
        console.log("⚠️ No courseProgressIds returned");
      }

      toast.success("payment successful, you are added to the course");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());  
  }
  catch(err){
      toast.error("Payment Failed");
      console.log("PAYMENT VERIFY ERROR....", err);
  }
  toast.dismiss(toastId);
 
}

