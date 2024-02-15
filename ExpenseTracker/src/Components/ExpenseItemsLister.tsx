import React from 'react';
import IExpenseItem from '../Models/expense';
import { Table } from 'react-bootstrap';

type Props = {
  expenseItems: IExpenseItem[]
}

const ExpenseItemsLister = ({ expenseItems }: Props) => {

  const formatDate = (dateObjFromServer: Date) => {
    const dateObj = new Date(dateObjFromServer);
    return dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/"
      + dateObj.getFullYear();
  }

  return (
    <div>
      <h3>Expenses View</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Description</th>
            <th>Payee Name</th>
            <th>Expense Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            expenseItems.map(expenseItem => {
              return (
                <tr>
                  <td>{expenseItem.id}</td>
                  <td>{expenseItem.expenseDescription}</td>
                  <td>{expenseItem.payeeName}</td>
                  <td>{formatDate(expenseItem.date)}</td>
                  <td>{expenseItem.price}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseItemsLister;