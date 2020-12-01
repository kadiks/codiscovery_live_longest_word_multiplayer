const freq = require("../data/letterFrequencies.json");

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * https://stackoverflow.com/a/1527820/185771
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// const pickLetters = (numLetters = 10) => {
//   const letters = [];
//   for (let index = numLetters; index > 0; index--) {
//     const letter = String.fromCharCode(getRandomInt(65, 90));
//     letters.push(letter);
//   }

//   return letters;
// };

const getRandVowels = () => {
  const vowels = Object.entries(freq.vowels);

  //   console.log(randLetters);
  const randLetters = vowels
    .map((freq) => {
      return freq[0].repeat(freq[1]);
    })
    .join("");
  return randLetters;
};

const getRandLetters = () => {
  const consonants = Object.entries(freq.consonants);
  const vowels = Object.entries(freq.vowels);

  const concatFreq = consonants.concat(vowels);

  //   console.log(randLetters);
  const randLetters = concatFreq
    .map((freq) => {
      return freq[0].repeat(freq[1]);
    })
    .join("");
  return randLetters;
};

const pickLetters = (numLetters = 10) => {
  const letters = [];

  const randLetters = getRandLetters();
  const randVowels = getRandVowels();

  let count = 1;

  for (let index = numLetters; index > 0; index--) {
    let sRand = randLetters;
    if (count <= 2) {
      sRand = randVowels;
    }
    const letter = sRand[getRandomInt(0, sRand.length - 1)];
    letters.push(letter);

    count++;
  }

  //   console.log(letters);
  return letters;
};

console.log("pickLetters", pickLetters());

module.exports = pickLetters;
