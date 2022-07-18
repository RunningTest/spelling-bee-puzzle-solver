const getAllWords = (
  highlightedLetter,
  lettersArraySet,
  cleaned_list
) => {
  for (let word in cleaned_list) {
    let wordSet = new Set(word.split(""));
    let compareSet = new Set(
      [...wordSet].filter((letter) => !lettersArraySet.has(letter))
    );

    if (compareSet.size !== 0) {
      delete cleaned_list[word];
    }
    if (!new Set(word.split("")).has(highlightedLetter)) {
      delete cleaned_list[word];
    }
  }

  return cleaned_list;
};

export default getAllWords;
