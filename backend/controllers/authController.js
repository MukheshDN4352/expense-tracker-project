const jwt=require("jsonwebtoken")
const User=require("../models/Users.js")

//Generate Jwt Token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"})
}

//Register User
exports.registerUser=async(req ,res)=>{
    console.log(req.body)
    const {fullName,email, password, profileImage}=req.body;
    //validation : check for missing fields
    if(!fullName|| !email || !password){
        return res.status(400).json({message:"All fields are mandatory"})

    }
    try {
        //check if email already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email is already in use"})
        }
        //create a new user
        const user=await User.create({
            fullName,
            email,
            password,
            profileImage
        })

        res.status(201).json({
            id: user._id,
            user,
            token:generateToken(user._id)
        })

    } catch (error) {
        res
          .status(500)
          .json({message:"Error registring user", error:error.message})
    }
};

//Login User
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"all fields are mandatory"})
    }

      try {
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid creadentials"});
        }

        res.status(200).json({
        id:user._id,
        user,
        token:generateToken(user._id)
           })
      } catch (error) {
        res
          .status(500)
          .json({message:"Error login user", error:error.message})
        
      }
};


// get user info
exports.getUserInfo=async(req,res)=>{
    try{
       
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user); 


    }catch(err){
         res
          .status(500)
          .json({message:"Error login user", error:error.message})
    }
};