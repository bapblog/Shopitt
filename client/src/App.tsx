import React, { FC, ReactElement, useEffect, useState } from "react";
import "./App.css";
// import { Outlet, Route, Routes } from "react-router-dom";
import IndexRouter from "./routes/indexRoutes";
import axios from "./api/axios";

const App: FC = () => {
  // const [data, setData] = useState<any[]>([]);
  // const [isError, setIsError] = useState<string>("");

  // const getApiData = async () => {
  //   try {
  //     const res = await axios.get("/api/user/getusers");
  //     setData(res.data);
  //   } catch (error: any) {
  //     setIsError(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getApiData();
  // }, []);
  // console.log(data);
  
  return (
    <div className="App">
      <IndexRouter />
    </div>
  );
};

export default App;
