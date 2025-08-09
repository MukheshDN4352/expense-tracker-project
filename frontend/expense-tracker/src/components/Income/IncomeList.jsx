import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions,onDelete,onDownLoad}) => {
    console.log(transactions)
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>
                Income sources
            </h5>

            <button className='card-btn' onClick={onDownLoad}>
                <LuDownload className='text-base'/>
                Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((item)=>{
                return(
             <TransactionInfoCard
               key={item._id}
               title={ item.source}
               icon={item.icon}
               date={moment(item.date).format("Do MMM YYYY")}
               amount={item.amount}
               type="income"
               onDelete={() => onDelete(item._id)}
               />
            )})}
        </div>
      
    </div>
  )
}

export default IncomeList
