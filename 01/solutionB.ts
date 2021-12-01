import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const depths = data
    .toString()
    .split("\n")
    .map((str) => +str); // cast to number

  // split into chunks of three by increasing by 1 [0,1,2] [1,2,3] [2,3,4] ...
  // oldsql
  let depthChunks = [];
  for (let i = 0 /* startindex */; i <= depths.length - 3; i++) {
    depthChunks.push(depths.slice(i, i + 3));
  }
  const summed = depthChunks.map((chunk) =>
    chunk.reduce((prev, next) => prev + next)
  );

  let counter = 0;
  const reducer = (prev, next) => {
    if (prev < next) {
      counter++;
      return next;
    }
    return next;
  };
  summed.reduce(reducer);
  console.log(counter);
});
