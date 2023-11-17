import { useState } from "react";
import Expenses from "./Expenses";

export default function Revenue() {
  const [revenueItems, setRevenueItems] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [revenueDescription, setRevenueDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newRevenueItems = {
      id,
      revenue,
      revenueDescription,
    };

    setRevenueItems((revenueItem) => [...revenueItem, newRevenueItems]);
    setRevenue(0);
    setRevenueDescription("");
  }

  function handleDeleteItem(id) {
    setRevenueItems((items) => items.filter((item) => item.id !== id));
  }

  const initialValue = 0;
  const totalRevenue = revenueItems.reduce(
    (acc, curValue) => acc + curValue.revenue,
    initialValue
  );

  return (
    <>
      <header className="header">
        <h1 className="header-title">| Financial Tracker |</h1>
      </header>
      <main>
        <h3 className="sub-title">Revenue</h3>
        <form onSubmit={handleSubmit} className="form">
          <label>Enter description:</label>
          <input
            type="text"
            value={revenueDescription}
            onChange={(e) => setRevenueDescription(e.target.value)}
            required
            className="input-box"
          ></input>
          <label>Enter amount:</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="input-box"
          ></input>
          <button className="submit-btn">Submit</button>
        </form>
        <div className="list">
          <p className="list-title">Items you have entered:</p>
          {revenueItems.map((item, id) => (
            <div key={id} className="list-item">
              <p>{item.revenueDescription}</p>
              <p>
                ${item.revenue}
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
        <p className="revenue">Your total revenue is ${totalRevenue}</p>
      </main>
      <Expenses totalRevenue={totalRevenue} />
    </>
  );
}
