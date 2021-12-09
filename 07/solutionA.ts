import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const crabs = data
    .toString()
    .split(",")
    .map((num) => +num);
  const highest = Math.max(...crabs);
  const lowest = Math.min(...crabs);
  let index = lowest;
  let currentBestPos;
  let currentBestSum;
  while (index <= highest) {
    // align all crabs, sum effort, compare to current best
    const sum = crabs.reduce((prevCrab, nextCrab) => {
      const fuelCost = Math.abs(index - nextCrab) + prevCrab;
      return fuelCost;
    }, 0);

    if (!currentBestPos) {
      currentBestPos = index;
      currentBestSum = sum;
    }

    if (sum < currentBestSum) {
      currentBestPos = index;
      currentBestSum = sum;
    }

    index++;
  }

  console.log(currentBestSum);
});
