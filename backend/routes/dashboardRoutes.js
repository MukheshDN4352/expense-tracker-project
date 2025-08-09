const express=require("express");

const {protect}=require("../middlewares/authMiddleware.js");
const {getDashBoardData}=require("../controllers/dashboardControllers.js")

const router=express.Router();

router.get("/",protect,getDashBoardData);

module.exports=router;