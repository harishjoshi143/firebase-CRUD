import React, { useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddData = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    if (data.name !== "" && data.email !== "") {
      try {
        if (id) {
          await setDoc(doc(db, "BlueStar", id), data);
          toast.success("data Updated successfully !");
        } else {
          await addDoc(collection(db, "BlueStar"), data);
          toast.success("data added successfully !");
        }
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        toast.error("please try again");
      }
    } else {
      toast.info("All fields are required !");
    }
  };

  async function showUser() {
    const docRef = doc(db, "BlueStar", id);
    const docSnap = await getDoc(docRef);
    setData(docSnap.data());
  }
  useEffect(() => {
    showUser();
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="text-white d-flex justify-content-center align-items-center min-vh-100 form_design">
      <form onSubmit={formHandler} style={{ color: "white" }}>
        <label className="fs-3" htmlFor="name">
          Name:{" "}
        </label>
        <input
          className="fs-3 ms-2"
          type="text"
          name="name"
          value={data.name}
          placeholder="Enter Your Name"
          onChange={inputHandler}
        />{" "}
        <br /> <br />
        <label className="fs-3" htmlFor="name">
          E-Mail:{" "}
        </label>
        <input
          className="fs-3 ms-2"
          type="text"
          name="email"
          value={data.email}
          placeholder="Enter Your Name"
          onChange={inputHandler}
        />{" "}
        <br />
        <br />
        <label className="fs-3" htmlFor="name">
          Class:{" "}
        </label>
        <input
          className="fs-3 ms-2"
          type="text"
          name="class"
          value={data.class}
          placeholder="Enter Your Name"
          onChange={inputHandler}
        />{" "}
        <br />
        <br />
        <label className="fs-3" htmlFor="name">
          Roll:{" "}
        </label>
        <input
          className="fs-3 ms-2"
          type="text"
          name="roll"
          value={data.roll}
          placeholder="Enter Your Name"
          onChange={inputHandler}
        />{" "}
        <br />
        <br />
        <div className="text-start">
          <Link to={"/"} className="btn btn-primary fs-3 " type="submit">
            Back Home
          </Link>
          <button className="btn btn-success fs-3 ms-3" type="submit">
            {id ? "Update Data" : "Add Data"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddData;
