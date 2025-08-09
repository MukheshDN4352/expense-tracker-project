const express=require("express")

const{
    addIncome,
    getAllIncome,
    deleteIncome,
    dowloadIncomeExel
}=require("../controllers/incomeControllers.js")

const {protect}=require("../middlewares/authMiddleware.js")

const router=express.Router();

router.post("/add",protect,addIncome);
router.get("/get",protect,getAllIncome);
router.get("/downloadexel",protect,dowloadIncomeExel);
router.delete("/:id",protect,deleteIncome);

module.exports =router;