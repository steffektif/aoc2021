import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;

  const arrayCount = data.toString().split("\n")[0].length;
  const matrix = data.toString().split("");
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
  let sum = [];

  for (let index = 0; index < vertArray.length; index++) {
    let zeros = 0;
    let ones = 0;
    vertArray[index].forEach((number) => {
      number === 1 ? ones++ : zeros++;
    });

    sum.push(zeros > ones ? 0 : 1);
  }

  const gamma = parseInt(sum.join(""), 2);
  const epsilon = parseInt(sum.map((num) => (num === 0 ? 1 : 0)).join(""), 2);

  let powerConsumption = gamma * epsilon;
  console.log(powerConsumption);
});
