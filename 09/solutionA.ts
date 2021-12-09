import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const map = data
    .toString()
    .split("\n")
    .map((line) => {
      const arr = line.split("");
      return arr.map((str) => +str);
    });

  let lowPointsSum = 0;
  for (let outter = 0; outter < map.length; outter++) {
    const line = map[outter];
    for (let inner = 0; inner < line.length; inner++) {
      const coord = line[inner];

      let top;
      let bottom;
      let left;
      let right;

      // check top
      if (map[outter - 1] === undefined) {
        top = true;
      } else if (map[outter - 1][inner] > coord) {
        top = true;
      }

      // check bottom

      if (map[outter + 1] === undefined) {
        bottom = true;
      } else if (map[outter + 1][inner] > coord) {
        bottom = true;
      }

      // check left
      if (map[outter][inner - 1] === undefined) {
        left = true;
      } else if (map[outter][inner - 1] > coord) {
        left = true;
      }

      // check right

      if (map[outter][inner + 1] === undefined) {
        right = true;
      } else if (map[outter][inner + 1] > coord) {
        right = true;
      }

      if (top && bottom && left && right) {
        // console.log(coord, "out", outter, "in", inner);

        lowPointsSum = lowPointsSum + coord + 1;
      }
    }
  }
  console.log(lowPointsSum);
});
