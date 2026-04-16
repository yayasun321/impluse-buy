import React, { useState, useEffect } from "react";
import {
  Timestamp,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import Box from "./Box";
import Button from "./Button";
import Carousel from "./Components/MyCarousel";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// This defines what a Purchase looks like so TypeScript stays happy
interface Purchase {
  id: string;
  item: string;
  createdAt: Timestamp;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  // 1. AUTH LISTENER: Manages login state and clears data on logout
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setPurchases([]); // Safety: Clear the list when the user logs out
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. DATABASE LISTENER: Only fetches items belonging to the logged-in user
  useEffect(() => {
    // Stop here if no user is logged in to avoid "undefined" errors
    if (!user) return;

    const q = query(
      collection(db, "purchases"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribeData = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { item: string; createdAt: Timestamp }),
        }));
        setPurchases(items);
      },
      (error) => {
        console.error("Firestore error:", error);
      },
    );

    return () => unsubscribeData();
  }, [user]);

  // 3. THE SWITCHER: Early return shows the landing page if not logged in
  if (!user) {
    return <Carousel />;
  }

  // 4. THE DASHBOARD: Shows your app logic once logged in
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="Main-Title">Have an impulse?</h1>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>

      {/* Your Evaluation components */}
      <Button onClick={() => console.log("Evaluate clicked")}>Evaluate</Button>
      <Box />

      <h1 className="Purchased-Title mt-5">Purchased:</h1>
      <ul className="list-group mb-5">
        {purchases.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="fw-bold">{p.item}</span>
            <span className="text-muted small">
              {p.createdAt
                ? p.createdAt.toDate().toLocaleDateString()
                : "Pending..."}
            </span>
          </li>
        ))}
        {purchases.length === 0 && (
          <li className="list-group-item text-center text-muted">
            No purchases logged yet.
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
