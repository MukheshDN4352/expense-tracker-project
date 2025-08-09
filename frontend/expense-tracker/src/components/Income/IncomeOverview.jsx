import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarchart'
import { prepareIncomeBarchartData } from '../../utils/helper'

const IncomeOverview = ({transactions,onAddIncome}) => {

  const [chartData,setChartData]=useState([]);


  useEffect(()=>{
    const result=prepareIncomeBarchartData(transactions)
    setChartData(result)

    return ()=>{}
  },[transactions])

  
  return (
    <div className='card'>
 <div className='flex items-center justify-between'>
  <div className=''>
    <h5 className='text-lg'>
      Income Overview
    </h5>
    <p className='text-x5 text-gray-400 mt-0.5'>
      Track your earnings over time and analyze you income transactions
    </p>
  </div>
  <button className='add-btn' onClick={onAddIncome}>
    <LuPlus className='text-lg'/>
    Add Income
  </button>
 </div>

 <div className='mt-10'>
 <CustomBarChart data={chartData} xAxisKey="source" barKey="amount" />
 </div>

 </div>
  )
}

export default IncomeOverview
