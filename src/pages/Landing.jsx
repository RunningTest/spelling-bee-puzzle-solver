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
  const [message, setMessage] = useState("Select the yellow cell and enter letters.");
  const [one, setOne] = useState();
  const [oneClass, setOneClass] = useState(true);
  const [two, setTwo] = useState();
  const [twoClass, setTwoClass] = useState(false);
  const [three, setThree] = useState();
  const [threeClass, setThreeClass] = useState(false);
  const [four, setFour] = useState();
  const [fourClass, setFourClass] = useState(false);
  const [five, setFive] = useState();
  const [fiveClass, setFiveClass] = useState(false);
  const [six, setSix] = useState();
  const [sixClass, setSixClass] = useState(false);
  const [seven, setSeven] = useState();
  const [sevenClass, setSevenClass] = useState(false);
  const [cellInput, setCellInput] = useState([]);
  const [cleanedList, setCleanedList] = useState();
  const [recievedWords, setRecievedWords] = useState(false);
  const [suggestions, setSuggestions] = useState();

  let potentialWords, lettersSet, highlightedLetter;
  let allSubmittedLetters = [];
  let inputArray = [];

  const onlyLetters = (str) => {
    return /^[a-zA-Z]{1,7}$/.test(str);
  };

  const handleChange = (e) => {
    if (onlyLetters(e.target.value)) {
      inputArray = e.target.value.split("");
      if (inputArray[0]) {
        setOne(inputArray[0].toUpperCase());
        setOneClass(false);
        setTwoClass(true);
      }
      if (inputArray[1]) {
        setTwo(inputArray[1].toUpperCase());
        setTwoClass(false);
        setThreeClass(true);
      }
      if (inputArray[2]) {
        setThree(inputArray[2].toUpperCase());
        setThreeClass(false);
        setFourClass(true);
      }
      if (inputArray[3]) {
        setFour(inputArray[3].toUpperCase());
        setFourClass(false);
        setFiveClass(true);
      }
      if (inputArray[4]) {
        setFive(inputArray[4].toUpperCase());
        setFiveClass(false);
        setSixClass(true);
      }
      if (inputArray[5]) {
        setSix(inputArray[5].toUpperCase());
        setSixClass(false);
        setSevenClass(true);
      }
      if (inputArray[6]) {
        setSeven(inputArray[6].toUpperCase());
        setSevenClass(false);
      }
      setCellInput(e.target.value.toUpperCase());
    } else {
      setMessage("Please only enter letters");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    allSubmittedLetters = cellInput.toLowerCase().split("");
    lettersSet = new Set(allSubmittedLetters);
    highlightedLetter = allSubmittedLetters[0];
    if (lettersSet.size !== 7) {
      setMessage("No double letters allowed!");
    } else {
      setMessage("searching ...");
      setRecievedWords(false);
      Solver(cellInput.toLowerCase());
    }
  };

  const refresh = (e) => {
    setOne();
    setTwo();
    setThree();
    setFour();
    setFive();
    setSix();
    setSeven();
    setCellInput([]);
    setMessage("Input letters here");
    setRecievedWords(false);
    setSuggestions();
    allSubmittedLetters = [];
  };

  const Solver = (cellInput) => {
    let cleaned_list = cleanWordList(words);
    potentialWords = findAllPossibleWords(
      highlightedLetter,
      lettersSet,
      cleaned_list
    );
    setCleanedList(potentialWords);
    setRecievedWords(true);
  };

  // Create a list of all word possible with current letters

  useEffect(() => {
    const suggestedWords = () => {
      if (recievedWords) {
        setMessage("Search completed!");
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
            <div className="cells">
              <div className="row" id="top-row">
                <div className={twoClass ? "hexagon focus" : "hexagon"}>
                  {two}
                </div>
                <div className={sevenClass ? "hexagon focus" : "hexagon"}>
                  {seven}
                </div>
              </div>
              <div className="row" id="middle-row">
                <div className={threeClass ? "hexagon focus" : "hexagon"}>
                  {three}
                </div>
                <div
                  className={oneClass ? "hexagon focus" : "hexagon"}
                  id="middle-cell"
                >
                  <input
                    type="text"
                    name="top-row"
                    maxLength={7}
                    required
                    autoComplete="off"
                    value={cellInput}
                    onChange={handleChange}
                  />
                  {one}
                </div>
                <div className={sixClass ? "hexagon focus" : "hexagon"}>
                  {six}
                </div>
              </div>
              <div className="row" id="bottom-row">
                <div className={fourClass ? "hexagon focus" : "hexagon"}>
                  {four}
                </div>
                <div className={fiveClass ? "hexagon focus" : "hexagon"}>
                  {five}
                </div>
              </div>
            </div>
            <label id="input-cells-label">{cellInput}</label>
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
