import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarchart from '../Charts/CustomBarchart';
const Last30DaysExpenses = ({data}) => {

  console.log("expense data is",data)
    const [chartData,setChartData]=useState([]);
    useEffect(()=>{
        const result=prepareExpenseBarChartData(data);
        setChartData(result);

        return ()=>{}
    },[data])
  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'> Last 30 days Expenses</h5>
        </div>
    <CustomBarchart data={chartData} xAxisKey="category" barKey="amount" />

    </div>
  )
}

export default Last30DaysExpenses
