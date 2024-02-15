import React from 'react';
import IExpenseItem from '../Models/expense';

const getAllPayeeNames = (expenseItems: IExpenseItem[]): string[] => {
  const uniqueNames: string[] = []
  expenseItems.forEach(expenseItem => {
    if (!uniqueNames.includes(expenseItem.payeeName)) {
      uniqueNames.push(expenseItem.payeeName)
    }
  })
  return uniqueNames;
}

const getIndividualExpenses = (payeeName: string, expenseItems: IExpenseItem[]): number => {
  let payeeTotalExpense = 0;
  expenseItems.forEach(expenseItem => {
    if (expenseItem.payeeName === payeeName) {
      payeeTotalExpense += expenseItem.price
    }
  })
  return payeeTotalExpense;
}

const getTotalExpense = (expenseItems: IExpenseItem[]): number => {
  let total = 0;
  expenseItems.forEach(expenseItem => {
    total += expenseItem.price
  })
  return total;
}

export { getAllPayeeNames, getIndividualExpenses, getTotalExpense };