const mongoose= require('mongoose');
require('dotenv').config();

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
        },
    ],
    price:{
        type:Number,
    },
    tag:{
        type:[String],
        required:true,
    },
    thumbnail:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft",
    },

},
{ timestamps: true }
);

module.exports = mongoose.model("Course",courseSchema);