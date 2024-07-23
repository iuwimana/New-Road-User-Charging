import React, { useState } from "react";
//import BarChart from "../../components/charts/BarChart";
//import LineChart from "../../components/charts/LineChart";
//import PieChart from "../../components/charts/PieChart";
import { UserData } from "../../services/data/data";

function RevenuHome() {
  {
    /** 
  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });*/
  }
  return (
    <div className="App">
      {/** 
      <main className="container">
        <div style={{ width: 700 }}>
          <BarChart chartData={userData} />
        </div>
        <div style={{ width: 700 }}>
          <LineChart chartData={userData} />
        </div>
        <div style={{ width: 700 }}>
          <PieChart chartData={userData} />
        </div>
      </main>*/}
    </div>
  );
}
export default RevenuHome;
