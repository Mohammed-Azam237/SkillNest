const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
require('dotenv').config();

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:10*60,
    }
});

//function create to send email
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from SkillNest", otp);
        console.log("Email send successfully:", mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails:",error);
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);