import React from "react";

// style
import "../styles/allSuggestedWords.css";

const AllSuggestedWords = ({ potentialWords }) => {
  let suggestionsArray = [];
  Object.keys(potentialWords).map((word) => suggestionsArray.push(word));

  suggestionsArray.sort((a, b) => a.length - b.length).reverse()

  const listItems = suggestionsArray.map((word, index) => {
    return(<li key={index}>{word}</li>)
  })

  if(suggestionsArray.length !== 0) {
  return (
    <>
      <div className="all-suggested-words">
        <h4>All possible words: </h4>
        <ul>{listItems}</ul>
      </div>
    </>
  )
  } else {
    return (
    <>
    <h2>No words found</h2>
  </>
    )
  }
};

export default AllSuggestedWords;
