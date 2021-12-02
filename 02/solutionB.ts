import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  data
    .toString()
    .split("\n")
    .map((str) => {
      return { direction: str.split(" ")[0], steps: str.split(" ")[1] };
    })
    .forEach((dir) => {
      if (dir.direction === "forward") {
        horizontal = horizontal + +dir.steps;
        depth = depth + aim * +dir.steps;
      }
      if (dir.direction === "down") {
        aim = aim + +dir.steps;
      }
      if (dir.direction === "up") {
        aim = aim - +dir.steps;
      }
    });

  console.log(
    "horizontal:",
    horizontal,
    "depth:",
    depth,
    "aim",
    aim,
    "result",
    horizontal * depth
  );
});
