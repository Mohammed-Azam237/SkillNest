const mongoose= require('mongoose');
require("dotenv").config();

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration: {
    type: Number,
    required: true,
    default: 0,
},
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
});

module.exports=mongoose.model("SubSection",subSectionSchema);
