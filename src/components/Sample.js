import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { liveURL, testURL } from "../../BaseURLs";

export default function Sample(props) {
  const { profiles, vocab } = props;
  const { id } = useParams();
  //   const liveURLwithID = `${liveURL}/${id}`;
  const testURLwithID = `${testURL}/${id}`;
  const [item, setItem] = useState([]);
  const [form, setForm] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (profiles.length > 0) {
      let item = profiles.filter((item) => item._id === id);
      setItem(item);
      addVocabData();
      setForm({
        user_name: item[0].user_name,
        user_level: item[0].user_level,
        user_vocab: item[0].user_vocab,
      });
    }
  }, [profiles, id]);

  const onchange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    axios
      .put(testURLwithID, form)
      .then((res) => setItem(res.data))
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

  const addVocabData = {
    if(item) {
      item.user_vocab.forEach((vocabdata) => {
        let vocabToUse = vocab.filter((vocab) => vocab._id === vocabdata._id);
        if (vocabToUse) {
          let vocabData = vocabToUse[0];
          item.user_vocab = [...item.user_vocab, vocabData];
        }
      });
    },
  };

  return (
    <div className="homepage">
      {item.map((profile) => {
        console.log("item", item);
        return (
          <div>
            <h1>Edit</h1>
            <div className="formbox">
              <form onSubmit={onSubmit}>
                <label> User Name: </label>
                <input
                  type="text"
                  name="user_name"
                  value={form.user_name}
                  onChange={onchange}
                />
                <label> User Level: </label>
                <input
                  type="text"
                  name="user_level"
                  value={form.user_level}
                  onChange={onchange}
                />
                <input id="submit" type="submit" value="Submit"></input>
              </form>
            </div>
            <div className="aboutbox">
              <div className="">
                <br></br>
                <p>
                  user_name: {profile.user_name} / user_level:{" "}
                  {profile.user_level}
                </p>
                <br></br>
                <div>
                  {profile.user_vocab.map((vocab) => {
                    return (
                      <div>
                        <p>{vocab.hebrew}</p>
                        <p>{vocab.transliteration}</p>
                        <p>{vocab.translation}</p>
                      </div>
                    );
                  })}
                </div>
                <br></br>
                <button onClick={onDelete}>Delete User</button>
                <span> NOTE: this cannot be undone!</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
