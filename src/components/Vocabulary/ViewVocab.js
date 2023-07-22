import React from "react";
import { Link } from "react-router-dom";

const ViewVocab = (props) => {
  const { vocab } = props;
  console.log("vocab", vocab);

  const clearStyle = {
    textDecoration: "none",
  };

  return (
    <div>
      {vocab.length === 0 && <p>Loading...</p>}
      <h3>Total items: {vocab.length}</h3>
      {vocab.map((vocabItem) => {
        return (
          <div className="aboutbox" key={vocabItem._id}>
            <div className="textbox">
              <Link
                to={`/${vocabItem._id}`}
                className={"editButtons"}
                style={clearStyle}
              >
                Edit/Delete
              </Link>
              <p>ID: {vocabItem._id}</p>
              <h3>{vocabItem.hebrew}</h3>
              <h4>{vocabItem.hebrew_with_nikkud}</h4>
              <p>
                Meaning: {vocabItem.meaning} | Reading:{vocabItem.reading} |
                Lesson:
                {vocabItem.lesson}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewVocab;
