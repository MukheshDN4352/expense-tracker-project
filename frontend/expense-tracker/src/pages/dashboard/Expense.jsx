import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import Dashboardlayout from '../../components/layouts/Dashboardlayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_paths } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/layouts/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Get All expense
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_paths.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add expense
  const handleAddExpense = async (expense) => {
    console.log("Expense is", expense);
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number and greater than zero");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_paths.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  // Handle download expense list
  const handleDownloadExpenseDetails = async () => {
    try {
      const response=await axiosInstance.get(
        API_paths.EXPENSE.DOWNLOAD_EXPENSE,{
          responseType:"blob"
        }
      )

       //create a url for the blob
        const url=window.URL.createObjectURL(new Blob([response.data]))
        const link=document.createElement("a");
        link.href=url
        link.setAttribute("download","expense_details.xlsx")
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("something went wrong ",error)
    }
  };

  // Handle delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_paths.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <Dashboardlayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownLoad={handleDownloadExpenseDetails}
          />
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add expense"
        >
          <AddExpenseForm onExpenseIncome={handleAddExpense} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </Dashboardlayout>
  );
};

export default Expense;
