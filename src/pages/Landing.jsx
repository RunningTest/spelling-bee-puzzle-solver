import React, { useState, useEffect } from "react";

// assets
import words from "../data/words_dictionary.json";
import cleanWordList from "../js/cleanWordList.js";
import findAllPossibleWords from "../js/findAllPossibleWords.js";

// components
import AllSuggestedWords from "../components/AllSuggestedWords";

// style
import "../styles/landing.css";

const Landing = () => {
  const [message, setMessage] = useState("Input letters here");
  const [cellInput, setCellInput] = useState([]);
  const [cleanedList, setCleanedList] = useState();
  const [recievedWords, setRecievedWords] = useState(false);
  const [suggestions, setSuggestions] = useState();
  
  let potentialWords, lettersSet, highlightedLetter;
  let allSubmittedLetters = [];

  const onlyLetters = (str) => {
    return /^[a-zA-Z]{1,7}$/.test(str);
  };

  const handleChange = (e) => {
    if (onlyLetters(e.target.value)) {
      setCellInput(e.target.value.toUpperCase());
    } else {
      setMessage("Please only enter letters");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    allSubmittedLetters = cellInput.toLowerCase().split("");
    lettersSet = new Set(allSubmittedLetters);
    highlightedLetter = allSubmittedLetters[0]
    if (lettersSet.size !== 7) {
      setMessage("No double letters allowed!");
    } else {
      setMessage("searching ...");
      setRecievedWords(false);
      Solver(cellInput.toLowerCase());
    }
  };

  const refresh = (e) => {
    setCellInput([]);
    setMessage("Input letters here");
    setRecievedWords(false);
    setSuggestions();
    allSubmittedLetters = [];
  };

  const Solver = (cellInput) => {
    let cleaned_list = cleanWordList(words);
    potentialWords = findAllPossibleWords(highlightedLetter, lettersSet, cleaned_list);
    setCleanedList(potentialWords);
    setRecievedWords(true);
  };

  // Create a list of all word possible with current letters

  useEffect(() => {
    const suggestedWords = () => {
      if (recievedWords) {
        setMessage("All Possible words found!");
        return <AllSuggestedWords potentialWords={cleanedList} />;
      }
    };
    setSuggestions(suggestedWords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedWords]);

  return (
    <div className="main-page-container">
      <div className="title-container">
        <h1>Spelling Bee Solver</h1>
      </div>
      <form className="letters-input" onSubmit={handleSubmit}>
        <h3>{message}</h3>
        <div className="solver-container">
          <div id="cell-input-container">
            <label id="input-cells-label">
              {cellInput}
              <input
                placeholder="ABC"
                id="top-row"
                type="text"
                name="top-row"
                maxLength={7}
                required
                autoComplete="off"
                value={cellInput}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="button-container">
            <input
              className="button"
              type="submit"
              value="Submit"
              autoComplete="off"
            />
            <input
              className="button"
              type="button"
              value="Refresh"
              autoComplete="off"
              onClick={refresh}
            />
          </div>
        </div>
      </form>
      <div className="solution-suggestions">
        <div className="suggested-words-container">{suggestions}</div>
      </div>
    </div>
  );
};

export default Landing;
