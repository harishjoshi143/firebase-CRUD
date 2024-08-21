import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";

export default function Details() {
  const { id } = useParams();
  const [data, setData] = useState("");

  async function showUser() {
    const docRef = doc(db, "BlueStar", id);
    const docSnap = await getDoc(docRef);
    setData(docSnap.data());
  }
  useEffect(() => {
    showUser();
  }, []);

  return (
    <>
      <div className="userDetail">
        <h1>Name:{data.name}</h1>
        <h1>Class:{data.class}</h1>
        <h1>Roll:{data.roll}</h1>
      </div>
    </>
  );
}
