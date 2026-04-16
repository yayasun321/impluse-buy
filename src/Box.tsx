import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Box.css";

const Box = () => {
  const [inputValue, setInputValue] = useState("");
  const handleLog = async () => {
    if (inputValue === "") console.log("User bought:", inputValue);
    try {
      await addDoc(collection(db, "purchases"), {
        item: inputValue,
        createdAt: serverTimestamp(),
      });

      console.log("Document written to Firebase");
      setInputValue("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="login-box">
      <input
        type="text"
        placeholder="Link or type in the name of the item"
        className="purchase-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleLog} className="btn btn-success">
        Log
      </button>
    </div>
  );
};

export default Box;
