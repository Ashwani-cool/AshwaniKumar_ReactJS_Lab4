import axios from 'axios';
import IExpenseItem from '../Models/expense';

const getAllExpenses = async () => {
  const response = await axios.get("https://serverexpensetracker.atikinivris.repl.co/expenses");
  return response.data;
}

const addNewExpense = async (newExpenseItem: Omit<IExpenseItem, 'id'>) => {
  return axios.post(
    'https://serverexpensetracker.atikinivris.repl.co/expenses',
    newExpenseItem,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => response.data);
}

export { getAllExpenses, addNewExpense };