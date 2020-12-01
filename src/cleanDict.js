const fs = require("fs-extra");
const diacritics = require("diacritics").remove;

/**
 * ["à", "abat-jour"]
 * {
 *   "a": "à",
 *   "abatjour": "abat-jour"
 * }
 */
const cleanDict = async () => {
  const oldDict = await fs.readFile("./fixtures/dico.fr.txt", "utf8");
  const arr = oldDict.split("\n");
  const dict = {};

  arr.forEach((word) => {
    const cleanWord = diacritics(word.replace("-", ""));

    dict[cleanWord] = word;
  });

  await fs.writeFile("./data/dict.json", JSON.stringify(dict));

  //   console.log(arr.length);
};

module.exports = cleanDict;
