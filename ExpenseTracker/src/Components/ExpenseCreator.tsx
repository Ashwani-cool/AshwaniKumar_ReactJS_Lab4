import React, { useState, useRef, FormEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllPayeeNames } from '../Services/expenseUtils';
import IExpenseItem from '../Models/expense';
import { addNewExpense } from '../Services/expense';

type Props = {
  expenseItems: IExpenseItem[],
  refresh: (newExpenseItem: IExpenseItem) => void
}

const ExpenseCreator = ({ expenseItems, refresh }: Props) => {

  const expenseDescptRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const payeeNameRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const submitNewExpense = async (event: FormEvent<HTMLFormElement>) => {
    const newExpenseItem = {
      expenseDescription: expenseDescptRef?.current?.value as string,
      payeeName: payeeNameRef?.current?.value as string,
      price: parseInt(priceRef?.current?.value as string),
      date: new Date(dateRef?.current?.value as string)
    };
    event.preventDefault();
    const response = await addNewExpense(newExpenseItem);
    console.log("New expense item submitted successfully");
    console.log(response);
    refresh(response);
    handleClose();
  };

  const createExpenseModelBody = () => {
    return (
      <Form onSubmit={submitNewExpense}>
        <Form.Group className="mb-3" controlId="expenseDescription">
          <Form.Label>Expense Detail</Form.Label>
          <Form.Control type="text" placeholder="Enter expense detail" ref={expenseDescptRef} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="payeeName">
          <Form.Label>Name</Form.Label>
          <Form.Select aria-label="Default select example" ref={payeeNameRef} required>
            <option value="">select</option>
            {
              getAllPayeeNames(expenseItems).map(name => {
                return (
                  <option value={name}>{name}</option>
                );
              })
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter expense price" min="1" ref={priceRef} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="expenseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Enter date of expense" ref={dateRef} required />
        </Form.Group>
        <Button variant="primary" type="submit">New Expense</Button>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Form>
    );
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        New Expense Item
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>{createExpenseModelBody()}</Modal.Body>
      </Modal>
    </div>
  );
}

export default ExpenseCreator;