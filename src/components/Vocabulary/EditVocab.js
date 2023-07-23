import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { testURL } from "../../BaseURLs";

export default function EditVocab(props) {
  const { vocab } = props;
  const { id } = useParams();
  const testURLwithID = `${testURL}/${id}`;
  const [item, setItem] = useState({});
  const [form, setForm] = useState({});
  const history = useHistory();

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
        gender: item.gender,
      });
    }
  }, [vocab, id]);

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
        <h2>Edit</h2>
        <div className="viewForm">
          <form onSubmit={onSubmit}>
            <label> Hebrew: </label>
            <input
              type="text"
              name="hebrew"
              value={form.hebrew}
              onChange={onchange}
            />
            <label> Nikkud: </label>
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
            <label> Gender: </label>
            <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={onchange}
            />
            <input
              className="submit-button"
              id="submit"
              type="submit"
              value="Submit Changes"
            ></input>
          </form>
        </div>
        <div className="viewEdit">
          <p>
            Hebrew:{item.hebrew} / Nikkud: {item.hebrew_with_nikkud} / Gender:{" "}
            {item.gender}
          </p>
          <p>
            Reading: {item.reading} / Meaning: {item.meaning} / Lesson:{" "}
            {item.lesson}
          </p>
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
