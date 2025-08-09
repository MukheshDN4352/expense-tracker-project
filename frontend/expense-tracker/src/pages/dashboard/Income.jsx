import React, { useEffect, useState } from 'react'
import Dashboardlayout from '../../components/layouts/Dashboardlayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_paths } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from "react-hot-toast"
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

import IncomeList from '../../components/Income/IncomeList';
const Income = () => {
  useUserAuth();
     const [incomeData,setIncomeData]=useState([])
      const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false);
      const [loading,setLoading]=useState(false);
      const[openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null
      })

      //get all income details
      const fetchIncomeDetails=async ()=>{
        if(loading) return ;
        setLoading(true);
        try{
          const response=await axiosInstance.get(
            `${API_paths.INCOME.GET_ALL_INCOME}`
          );

    
           if(response.data){
          setIncomeData(response.data)
        }

  
        }catch(error){
          console.log("something went wrong ",error)
        }finally{
          setLoading(false)
        }
       


      };

      

      //Handle add income
      const handleAddIncome=async(income)=>{
        console.log("income data is", income)
        const{source, amount, date,icon}=income;
        if(!source.trim()){
          toast.error("Source is required")
          return
        }
        if(!amount || isNaN(amount) || Number(amount)<=0){
          toast.error("Amount should be a valid number and greater than zero");
          return
        }

        if(!date){
          toast.error("date is required")
          return
        }

        try {
          await axiosInstance.post(API_paths.INCOME.ADD_INCOME,{
            source,
            amount,
            date,
            icon
          })

          setOpenAddIncomeModal(false);
          toast.success("Income added succesfully");
          fetchIncomeDetails()
        } catch (error) {
          console.log("something went wrong " ,error) 
        }

      }

      //delete income
      const deleteIncome=async(id)=>{
        try {
          await axiosInstance.delete(API_paths.INCOME.DELETE_INCOME(id))
          toast.success("Income details deleted succesfully")
          setOpenDeleteAlert({show:false,data:null});
              fetchIncomeDetails();
        } catch (error) {
          console.log("something went wrong ", error)
        }


      }

      //handle dowload income details
const handleDownloadIncomeDetails = async () => {
    try {
      const response=await axiosInstance.get(
        API_paths.INCOME.DOWNLOAD_INCOME,{
          responseType:"blob"
        }
      )

       //create a url for the blob
        const url=window.URL.createObjectURL(new Blob([response.data]))
        const link=document.createElement("a");
        link.href=url
        link.setAttribute("download","income_details.xlsx")
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("something went wrong ",error)
    }
  };
 
     useEffect(()=>{
       fetchIncomeDetails();

     return ()=>{}
     },[])



  return (
  
    <Dashboardlayout activeMenu="Income">
       <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
           <IncomeOverview
          transactions={incomeData}
        onAddIncome={() => setOpenAddIncomeModal(true)}
        />
          </div>

        <IncomeList 
          transactions={incomeData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id})
          }}

          onDownLoad={handleDownloadIncomeDetails}
          />

        </div>


      <Modal
        isOpen={openAddIncomeModal}
        onClose={()=>setOpenAddIncomeModal(false)}
        title="Add Income"
        >
       <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

       <Modal 
         isOpen={openDeleteAlert.show}
         onClose={()=>setOpenDeleteAlert({show:false,data:null})}
         title="Delete Income"
         >
          <DeleteAlert 
            content="Are you sure you want to delete this income details"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
            />
         </Modal>
       
       </div>
    </Dashboardlayout>
   
  )
}

export default Income
