import React from "react";
import "./App.css";
import Search from "./page/Search";
import Login from "./page/Login";
import MainPage from "./components/main/MainPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/login/Dashboard";

const App = () => {
  return (
    <>
      {/*<Search />*/}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />

        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
};

export default App;
