import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;

  const lines = data
    .toString()
    .split("\n")
    .map((str) => str.split("|"));

  const numbers = lines
    .map((str) => {
      return { decoder: deductNumbers(str[0].trim()), code: str[1].trim() };
    })
    .map((current) => {
      const numbers = current.code.split(" ").map((code) => {
        let result;
        current.decoder.forEach((value, key) => {
          if (
            key
              .split("")
              .every((keyPart) => code.split("").includes(keyPart)) &&
            key.length === code.length
          ) {
            result = value;
          }
        });
        return result;
      });

      return +numbers.join("");
    });

  console.log(numbers.reduce((prev, next) => prev + next, 0));
});

function deductNumbers(signalPattern: string) {
  const numberByPattern = new Map();
  const patternByNumber = new Map();

  const splitPattern = signalPattern.split(" ");

  while (patternByNumber.size < 10) {
    splitPattern.forEach((patt) => {
      if (patt.length === 2) {
        // this is number 1
        numberByPattern.set(patt, 1);
        patternByNumber.set(1, patt);
      }
      if (patt.length === 3) {
        // this is number 7
        numberByPattern.set(patt, 7);
        patternByNumber.set(7, patt);
      }
      if (patt.length === 4) {
        // this is number 4
        numberByPattern.set(patt, 4);
        patternByNumber.set(4, patt);
      }
      if (patt.length === 5) {
        // this is either 2,3 or 5
        // find 3
        if (patternByNumber.has(4) && patternByNumber.has(1)) {
          const contentsFour = patternByNumber.get(4).split("");
          const contentsOne = patternByNumber.get(1).split("");
          // 4 signals -- remove the ones in commmon with 1 -> 2 left these 2 needs to be in the pattern, then you know that this is number 5
          let commonsFourAndOne = [];

          contentsOne.forEach((str) => {
            if (contentsFour.includes(str)) {
              commonsFourAndOne.push(str);
            }
          });
          // find 3
          const toBeDefined = patt.split("");

          if (commonsFourAndOne.every((char) => toBeDefined.includes(char))) {
            numberByPattern.set(patt, 3);
            patternByNumber.set(3, patt);
          }
        }

        if (patternByNumber.get(6) && patternByNumber.get(3)) {
          let pattern6 = patternByNumber.get(6);
          if (patt.split("").every((str) => pattern6.split("").includes(str))) {
            numberByPattern.set(patt, 5);
            patternByNumber.set(5, patt);
          } else if (!numberByPattern.get(patt)) {
            numberByPattern.set(patt, 2);
            patternByNumber.set(2, patt);
          }
        }

        //this now only contains 2 signals and these BOTH need to be in one of the 5 length strings then we found the 5
      }
      if (patt.length === 6) {
        // find 6 & 0
        if (
          patternByNumber.get(8) &&
          patternByNumber.get(3) &&
          patternByNumber.get(1)
        ) {
          let pattern8 = patternByNumber.get(8).split("");
          let pattern3 = patternByNumber.get(3).split("");

          pattern3.forEach((char) => {
            for (let index = 0; index < pattern8.length; index++) {
              removeItemOnce(pattern8, char);
            }
          });

          if (pattern8.every((char) => patt.split("").includes(char))) {
            // check against 1 if it contains both parts its the 0
            if (
              patternByNumber
                .get(1)
                .split("")
                .every((str) => patt.split("").includes(str))
            ) {
              numberByPattern.set(patt, 0);
              patternByNumber.set(0, patt);
            } else {
              numberByPattern.set(patt, 6);
              patternByNumber.set(6, patt);
            }
          } else {
            //if its not 6 or 0 it must be 9
            numberByPattern.set(patt, 9);
            patternByNumber.set(9, patt);
          }
        }
      }
      if (patt.length === 7) {
        numberByPattern.set(patt, 8);
        patternByNumber.set(8, patt);
      }

      // so far we know 1, 4, 7, 3, 8,
      // missing 2,5 9 (we got this one once we find 5)
    });
  }
  return numberByPattern;
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
