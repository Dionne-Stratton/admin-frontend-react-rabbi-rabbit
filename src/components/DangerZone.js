import React from "react";
import { SeedVocab } from "../Data/SeedData";
import axios from "axios";

const DangerZone = () => {
  function runSeeds() {
    console.log("runSeeds");

    SeedVocab.forEach((item) => {
      axios
        .post("http://localhost:5000/vocab", item)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    });
  }

  function clearDatabase() {
    console.log("clearDatabase");
    //use axios to delete all the data in the database.
    axios
      .delete("http://localhost:5000/api/vocab")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="headernav">
      <div className="text-box">
        <h3>Welcome to the danger zone!</h3>
        <button onClick={runSeeds}>Seed the database</button>
        <p> Click on the "View" button to view the database. </p>
        <p> Click on the "Add" button to add to the database. </p>
      </div>
    </div>
  );
};

export default DangerZone;
