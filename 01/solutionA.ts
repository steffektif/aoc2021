import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const depths = data
    .toString()
    .split("\n")
    .map((str) => +str); // cast to number

  let counter = 0;
  const reducer = (prev, next) => {
    if (prev < next) {
      counter++;
      return next;
    }
    return next;
  };

  depths.reduce(reducer);
  console.log(counter);
});
