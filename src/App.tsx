import React, { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { db, auth } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import Box from "./Box";
import Button from "./Button";

function App() {
  const [purchases, setPurchases] = useState<
    { id: string; item: string; createdAt: Timestamp }[]
  >([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("Waiting for user login...");
      return;
    }

    const q = query(
      collection(db, "purchases"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data() as { item: string; createdAt: Timestamp };
        return {
          id: doc.id,
          item: data.item || "",
          createdAt: data.createdAt,
        };
      });
      setPurchases(items);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  return (
    <div>
      <h1 className="Main-Title">Have an impulse?</h1>
      <Button onClick={() => console.log("Clicked")}>Evaluate</Button>
      <Box />
      <h1 className="Purchased-Title">Purchased:</h1>
      <ul className="list-group">
        {purchases.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between"
          >
            {p.item}
            <span className="text-muted small">
              {p.createdAt
                ? p.createdAt.toDate().toLocaleDateString()
                : "Loading..."}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
