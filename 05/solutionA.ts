import * as fs from "fs";
import * as path from "path";
import { pipeline } from "stream";

let board = new Set();
let alreadyCounted = new Set();

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const pipeCoordinates = data
    .toString()
    .split("\n")
    .map((coords) => coords.split("->"))
    .map((coords) => {
      return {
        x1: +coords[0].split(",")[0],
        y1: +coords[0].split(",")[1],
        x2: +coords[1].split(",")[0],
        y2: +coords[1].split(",")[1],
      };
    });

  pipeCoordinates
    .filter((pipe) => pipe.x1 === pipe.x2 || pipe.y1 === pipe.y2)
    .map((pipe) => traversePipe(pipe));

  console.log(alreadyCounted.size);
});

function traversePipe(pipe) {
  // y1 === y2

  if (pipe.x1 != pipe.x2) {
    if (pipe.x1 > pipe.x2) {
      pipe.passed = traverseX(pipe.x1, pipe.x2, pipe.y1);
    } else {
      pipe.passed = traverseX(pipe.x2, pipe.x1, pipe.y1);
    }
  }

  // x1 === x2

  if (pipe.y1 != pipe.y2) {
    if (pipe.y1 > pipe.y2) {
      pipe.passed = traverseY(pipe.y1, pipe.y2, pipe.x1);
    } else {
      pipe.passed = traverseY(pipe.y2, pipe.y1, pipe.x1);
    }
  }

  return pipe;
}

function traverseX(bigger, smaller, otherCoord) {
  let traversed = [];
  while (smaller <= bigger) {
    count(smaller, otherCoord);
    traversed.push([smaller, otherCoord]);
    smaller++;
  }

  return traversed;
}

function traverseY(bigger, smaller, otherCoord) {
  let traversed = [];
  while (smaller <= bigger) {
    count(otherCoord, smaller);
    traversed.push([otherCoord, smaller]);
    smaller++;
  }

  return traversed;
}

function count(smaller, otherCoord) {
  const key = `${smaller}, ${otherCoord}`;
  if (board.has(key) && !alreadyCounted.has(key)) {
    alreadyCounted.add(key);
  }
  if (!board.has(key)) {
    board.add(key);
  }
}
