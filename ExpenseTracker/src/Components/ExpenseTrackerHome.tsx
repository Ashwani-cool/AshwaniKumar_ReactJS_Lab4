import React, { useEffect, useState } from 'react';
import { getAllExpenses } from '../Services/expense';
import { Container } from 'react-bootstrap';
import IExpenseItem from '../Models/expense';
import ExpenseItemsLister from './ExpenseItemsLister';
import ExpensesByPayee from './ExpensesByPayee';
import ExpenseCreator from './ExpenseCreator';

const ExpenseTrackerApp = () => {

  const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

  const refresh = (newExpenseItems: IExpenseItem) => {
    setExpenseItems(
      [
        ...expenseItems,
        newExpenseItems
      ]
    )
  }

  useEffect(() => {
    const fetchAllExpenses = async () => {
      const data = await getAllExpenses();
      setExpenseItems(data);
    }
    fetchAllExpenses();
  }, [])

  return (
    <Container>
      <h2>Expense Tracker Application</h2>
      <hr></hr>
      <ExpenseCreator refresh={refresh} expenseItems={expenseItems}></ExpenseCreator>
      <ExpenseItemsLister expenseItems={expenseItems}></ExpenseItemsLister>
      <ExpensesByPayee expenseItems={expenseItems}></ExpensesByPayee>
    </Container >
  );
}

export default ExpenseTrackerApp;