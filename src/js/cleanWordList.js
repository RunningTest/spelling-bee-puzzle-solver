// This is a helper function I wrote to clean up my
// words_dictionary.json file. This function cleans
// the word list of all words not allowed by letter box
// There are no words shorter than 3 characters and no
// words with double letters allowed.

const cleanWordList = (wordList) => {

  for (let word in wordList) {
    if (word.length < 4) {
      delete wordList[word];
    }
  }

  return wordList;

};

export default cleanWordList;
