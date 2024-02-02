import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    companyName:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    businessDescription:{
        type:String,
        required:true
    },
    revenue:{
        type:String,
        required:true
    }
},{timestamps:true});

export default mongoose.model('startups', startupSchema);