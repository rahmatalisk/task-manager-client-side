import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";
import "./styles/main.css";

function App() {
  const [searchText,setSearchText] = useState("")
  return (
    <BrowserRouter>
      <Header searchText={searchText} setSearchText={setSearchText}/>
      <Routes>
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:taskId" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
