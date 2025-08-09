const Income=require("../models/Income.js")
const Expense=require("../models/Expense.js")

const {isValidObjectId,Types}=require("mongoose");

exports.getDashBoardData=async(req,res) =>{
    try{
        const userId=req.user.id;
        const userObjectId=new Types.ObjectId(String(userId));

        const testIncome = await Income.find({ userId: userObjectId });
  console.log("testIncome length", testIncome);
        // fetch total income && expenses
 const totalIncome = await Income.aggregate([
  {
    $match: {
      userId: userObjectId,
      amount: { $type: "string" } // Only process string amounts
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: { $toDouble: "$amount" } }
    }
  }
]);

console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

const totalExpense = await Expense.aggregate([
  {
    $match: {
      userId: userObjectId,
      amount: { $type: "string" }
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: { $toDouble: "$amount" } }
    }
  }
]);


        //get income transactions of last 60 days
        const last60DaysIncomeTransactions=await Income.find({
            userId,
            date:{$gte:new Date(Date.now()-60*24*60*60*1000)}
        }).sort({date:-1});

        //get total income for last 60 days
     const incomeLast60Days = last60DaysIncomeTransactions.reduce(
  (sum, transaction) => sum + Number(transaction.amount), 0
);

       //get expense transaction of last 30 days
      const last30DaysExpenseTransactions=await Expense.find({
            userId,
            date:{$gte:new Date(Date.now()-30*24*60*60*1000)}
        }).sort({date:-1});

        //get total expense of last 30 days
      const expenseLast30days = last30DaysExpenseTransactions.reduce(
  (sum, transaction) => sum + Number(transaction.amount), 0
);

        //fetch last 5 tractions (income + expense)
const lastTransactions = [
  ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
    (txn) => ({
      ...txn.toObject(),
      type: "income"
    })
  ),
  ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
    (txn) => ({
      ...txn.toObject(),
      type: "expense"
    })
  )
].sort((a, b) => new Date(b.date) - new Date(a.date)); // sort latest first


        //Final Response
       res.json({
        totalBalance:
          (totalIncome[0]?.total || 0)-(totalExpense[0]?.total ||0),
          totalIncome: totalIncome[0]?.total || 0,
          totalExpense: totalExpense[0]?.total ||0,
          last30DaysExpenses:{
            total: expenseLast30days,
            transactions: last30DaysExpenseTransactions
          },
          last60DaysIncome:{
            total:incomeLast60Days,
            transactions: last60DaysIncomeTransactions
          },
          recentTransactions:lastTransactions,
       })

    }catch(error){
       res.status(500).json({message:`server error ${error.stack}`})
    }
}