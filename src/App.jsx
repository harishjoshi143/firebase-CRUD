import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddData from "./AddData";

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // data get  ==================
  async function getData() {
    const dataList = [];
    const querySnapshot = await getDocs(collection(db, "BlueStar"));
    querySnapshot.forEach((doc) => {
      dataList.push({ id: doc.id, ...doc.data() });
    });
    setUsers(dataList);
  }

  const notify = () => toast.success("delete successfully");
  useEffect(() => {
    getData();
  }, []);

  // delete data ==========

  async function handleDelete(id) {
    await deleteDoc(doc(db, "BlueStar", id));
    setUsers(users.filter((user) => user.id !== id));
    notify();
  }
  handleDelete();

  // update data ==========

  async function handleUpdate(id) {
    navigate(`/UpdateDate/${id}`);
  }

  return (
    <>
      <Link className="text-decoration-none text-center" to="/create-users">
        {" "}
        <div className="btn_desing">
          <h2 className="text-white">Click to Add data</h2>
        </div>
      </Link>
      <div className="d-flex gap-4 flex-wrap mt-5">
        {users.map((item) => {
          return (
            <div
              className="text-decoration-none text-black box_Design"
              key={item.id}
            >
              <div className="text-center">
                <Link
                  className="text-decoration-none text-black"
                  to={`/details/${item.id}`}
                >
                  <img
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                    src="https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww"
                    alt=""
                  />
                  <h4 className="mt-3 text-white">{item.name}</h4>
                </Link>
              </div>
              <div className="text-center">
                <button
                  className="btn bg-white text-black px-5 rounded-5 mt-2 fs-4 fw-medium"
                  onClick={(e) => handleDelete(item.id)}
                >
                  delete
                </button>
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="btn bg-white text-black px-5 rounded-5 mt-2 fs-4 fw-medium"
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
        <ToastContainer />
      </div>
    </>
  );
}
export default App;
