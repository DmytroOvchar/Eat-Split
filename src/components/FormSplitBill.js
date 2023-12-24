import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paiddUser, setPaidUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const paidByFriend = bill ? bill - paiddUser : "";


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByFriend) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paiddUser);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a Bill with {selectedFriend.name}</h2>
      <label htmlFor="Bill value">Bill value</label>
      <input
        type="text"
        id="Bill value"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label htmlFor="Your expense">Your expense</label>
      <input
        type="text"
        id="Your expense"
        value={paiddUser}
        onChange={(e) =>
          setPaidUser(+e.target.value > bill ? paiddUser : +e.target.value)
        }
      />

      <label htmlFor="X expense">{selectedFriend.name} expense</label>
      <input type="text" id="X expense" disabled value={paidByFriend} />

      <label htmlFor="select">Who is paying the bill ?</label>
      <select
        id="select"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
