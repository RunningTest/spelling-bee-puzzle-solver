// This is a helper function I wrote to clean up my
// words_dictionary.json file. This function cleans
// the word list of all words not allowed by spelling bee
// There are no words shorter than 4 characters allowed.

const cleanWordList = (wordList) => {

  for (let word in wordList) {
    if (word.length < 4) {
      delete wordList[word];
    }
  }

  return wordList;

};

export default cleanWordList;
