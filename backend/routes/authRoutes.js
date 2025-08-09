const express=require("express");
const authMiddleware=require("../middlewares/authMiddleware.js")
const upload=require("../middlewares/uploadMiddleware.js")
const{
    registerUser,
    loginUser,
    getUserInfo,
}=require("../controllers/authController.js")

const router =express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUser", authMiddleware.protect, getUserInfo);

router.post("/upload-image",upload.single("image"),(req,res)=>{
   
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})

    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({imageUrl})
})
module.exports=router;