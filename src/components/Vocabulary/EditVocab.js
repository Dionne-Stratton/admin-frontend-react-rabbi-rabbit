import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { testURL } from "../../BaseURLs";

export default function EditVocab(props) {
  const { vocab, setVocab } = props;
  const { id } = useParams();
  // const liveURLwithID = `${testURL}/${id}`;
  const testURLwithID = `${testURL}/${id}`;
  const [item, setItem] = useState({});
  const [form, setForm] = useState({});
  const history = useHistory();
  console.log("edit-vocab", vocab);

  useEffect(() => {
    if (vocab.length > 0) {
      let item = vocab.filter((item) => item._id === id)[0];
      setItem(item);
      setForm({
        hebrew: item.hebrew,
        hebrew_with_nikkud: item.hebrew_with_nikkud,
        meaning: item.meaning,
        reading: item.reading,
        lesson: item.lesson,
      });
    }
  }, [vocab, id]);

  console.log("item", item);
  const onchange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    axios
      .put(testURLwithID, form)
      // have .then setVocab to the new data plus the old and setItem to the new data
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onDelete = (e) => {
    e.preventDefault();
    axios
      .delete(testURLwithID)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => history.push("/"));
  };

  return (
    <div className="homepage">
      <div>
        <h1>Edit</h1>
        <div className="formbox">
          <form onSubmit={onSubmit}>
            <label> Hebrew: </label>
            <input
              type="text"
              name="hebrew"
              value={form.hebrew}
              onChange={onchange}
            />
            <label> Hebrew with nikkud: </label>
            <input
              type="text"
              name="hebrew_with_nikkud"
              value={form.hebrew_with_nikkud}
              onChange={onchange}
            />
            <label> Meaning: </label>
            <input
              type="text"
              name="meaning"
              value={form.meaning}
              onChange={onchange}
            />
            <br></br>
            <label> Reading: </label>
            <input
              type="text"
              name="reading"
              value={form.reading}
              onChange={onchange}
            />
            <label> Lesson: </label>
            <input
              type="text"
              name="lesson"
              value={form.lesson}
              onChange={onchange}
            />
            <br />
            <input id="submit" type="submit" value="Submit"></input>
          </form>
        </div>
        <div className="aboutbox">
          <div className="">
            <br></br>
            <p>
              Hebrew:{item.hebrew} / hebrew_with_nikkud:{" "}
              {item.hebrew_with_nikkud} <br></br> Reading: {item.reading} /
              Meaning: {item.meaning} / Lesson: {item.lesson}
            </p>
            <button onClick={onDelete}>Delete Vocab Word</button>
            <span> NOTE: this cannot be undone!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
