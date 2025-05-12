import mongoose from "mongoose";
const quotesSchema=new mongoose.Schema({
    quote:{
        type:String,
        required:true
    },
    writtenBy:{
        type:String,
        required:true
    },
    createdAt:{
     type:Date,
     default:Date.now,
     expires:86400
    },
})
const Quotes = mongoose.model("Quotes", quotesSchema);
export default Quotes;