import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  let initial = data
    .toString()
    .split(",")
    .map((num) => +num);

  let oldsql = new Map();

  initial.forEach((fish) => {
    if (oldsql.has(fish)) {
      oldsql.set(fish, oldsql.get(fish) + 1);
    } else {
      oldsql.set(fish, 1); // key = 1 -> set (put)
    }
  });

  let newsql = new Map();

  for (let days = 1; days <= 256; days++) {
    //beginning of day
    //new fishies will be born

    let zeroes = oldsql.get(0) ?? 0;

    oldsql.forEach((value, key) => {
      //shift by -1
      if (key !== 0) {
        newsql.set(key - 1, value);
      }
    });

    let newCount = newsql.get(6) ?? 0;
    newCount = newCount + zeroes;
    newsql.set(6, newCount);
    newsql.set(8, zeroes);

    //end of day

    oldsql = newsql;
    newsql = new Map();
  }

  let sum = 0;
  oldsql.forEach((value) => {
    sum += value;
  });

  console.log(sum);
});
