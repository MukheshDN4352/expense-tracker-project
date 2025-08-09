import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLinechart';

const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const [chartData, setCharData]=useState([]);

    useEffect(()=>{
        const result=prepareExpenseLineChartData(transactions);
        setCharData(result)

        return ()=>{}
    },[transactions])
  return (
       <div className='card'>
 <div className='flex items-center justify-between'>
  <div className=''>
    <h5 className='text-lg'>
      Expense Overview
    </h5>
    <p className='text-x5 text-gray-400 mt-0.5'>
      Track your expenses over time and analyze you expense transactions
    </p>
  </div>
  <button className='add-btn' onClick={onExpenseIncome}>
    <LuPlus className='text-lg'/>
    Add expense
  </button>
 </div>

 <div className='mt-10'>
 < CustomLineChart data={chartData} xAxisKey="category" />
 </div>

 </div>
  )
}

export default ExpenseOverview
