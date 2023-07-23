import React, { useState } from "react";
import axios from "axios";
import { testURL } from "../../BaseURLs";

export default function AddVocab(props) {
  const { setVocab, vocab } = props;
  const initialForm = {
    hebrew: "",
    hebrew_with_nikkud: "",
    meaning: [],
    reading: "",
    lesson: 0,
    gender: "",
  };

  const [form, setForm] = useState(initialForm);

  const onchange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    axios
      .post(testURL, form)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      //clear form
      .finally(() => setForm(initialForm));
  };

  return (
    <div className="homepage">
      <div>
        <h1>Add</h1>
        <div className="formbox">
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
              type="number"
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
            <br />
            <input id="submit" type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
    </div>
  );
}
