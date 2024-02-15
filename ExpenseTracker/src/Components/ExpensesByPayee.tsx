import React from 'react';
import { Table } from 'react-bootstrap';
import IExpenseItem from '../Models/expense';
import { getAllPayeeNames, getIndividualExpenses, getTotalExpense } from '../Services/expenseUtils';

type Props = {
  expenseItems: IExpenseItem[]
}

const ExpensesByPayee = ({ expenseItems }: Props) => {
  const namedExpenses = new Map<string, number>();

  const getPayeeName = () => {
    for (let [key, value] of namedExpenses.entries()) {
      if (value === Math.max(...namedExpenses.values())) {
        return key;
      }
    }
  }

  return (
    <div>
      <h3>Payee View</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Payee Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            getAllPayeeNames(expenseItems).map((name, idx) => {
              namedExpenses.set(name, getIndividualExpenses(name, expenseItems))
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{name}</td>
                  <td>{namedExpenses.get(name)}</td>
                </tr>
              )
            })
          }
          <tr>
            <td></td>
            <td>Grand Total</td>
            <td>{getTotalExpense(expenseItems)}</td>
          </tr>
          <tr>
            <td></td>
            <td>{`pay ${getPayeeName()}`}</td>
            <td>{Math.max(...namedExpenses.values()) - Math.min(...namedExpenses.values())}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ExpensesByPayee;