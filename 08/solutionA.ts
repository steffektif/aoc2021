import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const digits = data
    .toString()
    .split("\n")
    .map((str) => str.split("|")[1].trim())
    .reduce((prev, next) => {
      return (
        prev +
        next
          .split(" ")
          .filter(
            (digit) =>
              digit.length === 2 ||
              digit.length === 3 ||
              digit.length === 4 ||
              digit.length === 7
          ).length
      );
    }, 0);

  console.log(digits);
});
