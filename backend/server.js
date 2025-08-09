require("dotenv").config();
const express=require("express")
const cors=require("cors");
const path=require("path");
const connectDB =require("./config/db.js")
const authRoutes=require("./routes/authRoutes.js");
const upload = require("./middlewares/uploadMiddleware.js");
const incomeRoutes =require("./routes/incomeRoutes.js");
const expenseRoutes=require("./routes/expenseRoutes.js");
const dashboardRoutes=require("./routes/dashboardRoutes.js")
const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);

app.use(express.json());

const PORT =process.env.PORT || 5000;

app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
connectDB();
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))