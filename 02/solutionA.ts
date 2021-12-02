import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  let depth = 0;
  let horizontal = 0;

  data
    .toString()
    .split("\n")
    .map((str) => {
      return { direction: str.split(" ")[0], steps: str.split(" ")[1] };
    })
    .forEach((dir) => {
      if (dir.direction === "forward") {
        horizontal = horizontal + +dir.steps;
      }
      if (dir.direction === "down") {
        depth = depth + +dir.steps;
      }
      if (dir.direction === "up") {
        depth = depth - +dir.steps;
      }
    });

  console.log(
    "horizontal:",
    horizontal,
    "depth:",
    depth,
    "result",
    horizontal * depth
  );
});
