import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details.jsx";
import AddData from "./AddData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create-users" element={<AddData />} />
        <Route path="/UpdateDate/:id" element={<AddData />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
