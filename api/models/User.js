const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    user:{type:String,required:true,unique:true},
    password:String
})
const User=mongoose.model("user",userSchema);
module.exports=User;
