const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const crypto= require('crypto');

//resetpassword token
exports.resetPasswordToken = async(req,res)=>{
   try{
         //get email for req ki body
        const {email} = req.body;
        //validation
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:'Your email is not registered',
            });
        }
        //generate a token
        const token = crypto.randomUUID();
        //update user by adding token and expire time
        const updatedDetails = await User.findOneAndUpdate(
                                                        {email:email},{
                                                        token:token,
                                                        resetPasswordExpires: Date.now() + 5*60*1000,
                                                    },
                                                    {new:true});
        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing url
        await mailSender(email,
            "password Reset Link",
            `Password Reset Link:${url}`);
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change password'
        })
   }
   catch(error){
    return res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset password"
    })
   }
}


//resetpasswords

exports.resetPassword = async(req,res)=>{
    try{
            //fetch data
        const {password,confirmPassword,token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }
        //get user details from db using token
        const userDetails = await User.findOne({token:token});
        //if not entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }

        //check token time
        if(userDetails.resetPasswordExpires< Date.now()){
            return res.json({
                success:false,
                message:'Your Token has been expired',
            })
        }
        //hash pwd

        const hashedPassword = await bcrypt.hash(password,10);
        //update pwd
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        //return res
        return res.status(200).json({
            success:true,
            message:'password rested successfully',
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'something went wrong while sending reset pwd mail',
        });
    }
}