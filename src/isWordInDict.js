const dict = require("../data/dict.json");

const isWordInDict = (word) => {
  return dict[word.toLowerCase()] ? true : false;
};

// console.log(isWordInDict("abaisselangUe") === true);
// console.log(isWordInDict("abaisselangye") === false);

module.exports = isWordInDict;
