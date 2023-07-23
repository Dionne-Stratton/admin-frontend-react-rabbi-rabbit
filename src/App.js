import "./App.css";
import { Switch, Route } from "react-router-dom";
import AddVocab from "./components/Vocabulary/AddVocab";
import EditVocab from "./components/Vocabulary/EditVocab";
import HeaderNav from "./components/HeaderNav";
import View from "./components/Vocabulary/ViewVocab";
import DangerZone from "./components/DangerZone";
import { useState, useEffect } from "react";
import axios from "axios";
import { testURL } from "./BaseURLs";

function App() {
  const [vocab, setVocab] = useState([]);
  useEffect(() => {
    axios
      .get(testURL)
      .then((res) => setVocab(res.data.reverse()))
      .catch((err) => console.log(err, "it has an error"));
  }, []);

  return (
    <div className="App">
      <HeaderNav />
      <Switch>
        <Route path="/dangerzone">
          <DangerZone />
        </Route>
        <Route path="/add">
          <AddVocab setVocab={setVocab} />
        </Route>
        <Route path="/:id">
          <EditVocab vocab={vocab} setVocab={setVocab} />
        </Route>
        <Route path="/">
          <View vocab={vocab} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
