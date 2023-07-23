import React from "react";
import { Link } from "react-router-dom";

const ViewVocab = (props) => {
  const { vocab } = props;
  console.log("vocab", vocab);

  const clearStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div>
      {vocab.length === 0 && <p>Loading...</p>}
      <h3>Total items: {vocab.length}</h3>
      {vocab.map((vocabItem) => {
        return (
          <div className="aboutbox" key={vocabItem._id}>
            <div className="textbox">
              <Link to={`/${vocabItem._id}`} style={clearStyle}>
                <p>Lesson: {vocabItem.lesson}</p>
                <h4>{vocabItem.meaning}</h4>
                <h4>{vocabItem.reading}</h4>
                <h4>
                  {vocabItem.hebrew_with_nikkud} / {vocabItem.hebrew}
                </h4>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewVocab;
