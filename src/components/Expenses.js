import { useState } from "react";

export default function Expenses({ totalRevenue }) {
  const [expense, setExpense] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseItems, setExpenseItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newExpenseItems = {
      id,
      expense,
      expenseDescription,
    };

    setExpenseItems((expenseItem) => [...expenseItem, newExpenseItems]);
    setExpense(0);
    setExpenseDescription("");
  }

  function handleDeleteItem(id) {
    setExpenseItems((items) => items.filter((item) => item.id !== id));
  }

  const initialValue = 0;
  const totalExpenses = expenseItems.reduce(
    (acc, curValue) => acc + curValue.expense,
    initialValue
  );

  function expensesLowToHigh() {
    const sortedExpenseItems = expenseItems.sort(
      (a, b) => a.expense - b.expense
    );
    setExpenseItems([...sortedExpenseItems]);
  }

  function expensesHighToLow() {
    const sortedExpenseItems = expenseItems.sort(
      (a, b) => b.expense - a.expense
    );
    setExpenseItems([...sortedExpenseItems]);
  }

  return (
    <>
      <main>
        <h3 className="sub-title sub-title-expenses">Expenses</h3>
        <form onSubmit={handleSubmit} className="form">
          <label>Enter description:</label>
          <input
            type="text"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            required
            className="input-box"
          ></input>
          <label>Enter amount:</label>
          <input
            type="number"
            value={expense}
            onChange={(e) => setExpense(Number(e.target.value))}
            className="input-box"
          ></input>
          <button className="submit-btn">Submit</button>
        </form>

        <div className="list">
          <p className="list-title">Items you have entered:</p>

          <div>
            <button className="sort-btn" onClick={expensesLowToHigh}>
              Sort $ ⬇️
            </button>
            <button className="sort-btn" onClick={expensesHighToLow}>
              Sort $ ⬆️
            </button>
          </div>
          {expenseItems.map((item, id) => (
            <div key={id} className="list-item">
              <p>{item.expenseDescription}</p>
              <p>
                ${item.expense}
                <button
                  className="delete"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  X
                </button>
              </p>
            </div>
          ))}
        </div>
        <p className="expenses">Your total expenses is ${totalExpenses}</p>
        <p className="balance">
          Your total balance is ${totalRevenue - totalExpenses}
        </p>
      </main>
      <footer className="footer">
        <p>| Created by Vijay Ramkissoon 2023 |</p>
      </footer>
    </>
  );
}
