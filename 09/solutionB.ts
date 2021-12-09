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

  const potentialBasins = [];
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
        potentialBasins.push({ x: inner, y: outter });
      }
    }
  }

  const basins = [];
  potentialBasins.forEach((startPoint) => {
    let visited = new Set();
    const potentialTargets = getTargets(startPoint);
    // move in any direction until you encounter a 9, a number smaller then yourself or a border,
    // while moving save every visited field in set
    // while moving count every step taken

    move(startPoint, visited, potentialTargets, map);
    basins.push(visited);
  });
  const winners = basins.map((basin) => basin.size).sort((a, b) => b - a);
  const top1 = winners[0];
  const top2 = winners[1];
  const top3 = winners[2];

  console.log(top1 * top2 * top3);
});

function move(startPoint, visited, targets, map) {
  visited.add(`${startPoint.x}-${startPoint.y}`);
  targets.forEach((target) => {
    if (canMove(target, map, visited, startPoint)) {
      // console.log("canMove");

      visited.add(`${target.x}-${target.y}`);
      move(target, visited, getTargets(target), map);
    } else {
      // console.log("cant move");
    }
  });
}

function canMove({ x, y }, map, visited, location) {
  if (map[y] === undefined) {
    return false;
  }

  if (map[y][x] === undefined) {
    return false;
  }

  if (visited.has(`${x}-${y}`)) {
    return false;
  }

  if (map[y][x] === 9) {
    return false;
  }

  if (map[location.y][location.x] >= map[y][x] /** target */) {
    return false;
  }

  return true;
}

function getTargets({ x, y }) {
  return [
    { x: x + 1, y: y },
    { x: x - 1, y: y },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
  ];
}
