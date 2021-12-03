import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;

  const oxygen = solve(data, (zeros, ones) => {
    if (zeros > ones) {
      return 0;
    }
    if (zeros < ones) {
      return 1;
    }
    return 1;
  });

  const co2scrubber = solve(data, (zeros, ones) => {
    if (zeros < ones) {
      return 0;
    }
    if (zeros > ones) {
      return 1;
    }
    return 0;
  });

  console.log(parseInt(oxygen.join(""), 2) * parseInt(co2scrubber.join(""), 2)); //4273224
});

function solve(data, findMore) {
  const lines = data.toString().split("\n");
  const lineLength = lines[0].length;
  const allChars = data.toString().split("");

  let newMatrix;
  let newAllChars = allChars;
  let newFiltered = lines;
  let result;

  for (let position = 0; position < lineLength; position++) {
    newMatrix = buildMatrix(newAllChars, lineLength);

    const zeroOrOne = isMoreOrLess(newMatrix, findMore, position);

    newFiltered = filterMatrix(newFiltered, zeroOrOne, position);

    newAllChars = rebuildMatrixFromFilter(newFiltered);
    result = newFiltered.length > 0 ? newFiltered : result;
  }
  return result;
}

function rebuildMatrixFromFilter(filtered) {
  const newFil = filtered.map((str) => {
    const newStr = str + "\n";
    return newStr.split("");
  });

  return newFil.flat();
}

function filterMatrix(lines, zeroOrOne, position) {
  let filteredLines = [];

  lines.forEach((line) => {
    const positionInLine = line[position];
    if (+positionInLine === zeroOrOne) {
      filteredLines.push(line);
    }
  });
  return filteredLines;
}

function isMoreOrLess(vertArray, fun: Function, index) {
  let zeros = 0;
  let ones = 0;
  vertArray[index].forEach((number) => {
    number === 1 ? ones++ : zeros++;
  });

  return fun(zeros, ones);
}

function buildMatrix(matrix, arrayCount) {
  let vertArray = [[]];

  for (let i = 1; i < arrayCount; i++) {
    vertArray.push([]);
  }

  let index = 0;

  matrix.map((str) => {
    if (str !== "\n") {
      vertArray[index].push(+str);
      index = index + 1;
    } else {
      index = 0;
    }
  });
  return vertArray;
}
