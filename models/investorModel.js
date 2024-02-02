import mongoose from "mongoose";

// Investor Schema
const investorSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

export default mongoose.model('investers', investorSchema);