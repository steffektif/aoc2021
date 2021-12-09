import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  let oldsql = data
    .toString()
    .split(",")
    .map((num) => +num);
  let newsql = [];

  for (let days = 1; days <= 80; days++) {
    //beginning of day
    //new fishies will be born
    oldsql.forEach((fish) => {
      if (fish !== 0) {
        newsql.push(fish - 1);
      } else {
        newsql.push(6);
        newsql.push(8);
      }
    });

    //end of day
    oldsql = [].concat(newsql);
    newsql = [];
  }
  console.log(oldsql.length);
});
