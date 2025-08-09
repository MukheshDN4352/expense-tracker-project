const express=require("express")

const{
    addExpense,
    getAllExpense,
    deleteExpense,
    dowloadExpenseExel
}=require("../controllers/expenseControllers.js")

const {protect}=require("../middlewares/authMiddleware.js")

const router=express.Router();

router.post("/add",protect,addExpense);
router.get("/get",protect,getAllExpense);
router.get("/downloadexel",protect,dowloadExpenseExel);
router.delete("/:id",protect,deleteExpense);

module.exports =router;