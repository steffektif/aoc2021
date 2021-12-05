import * as fs from "fs";
import * as path from "path";

fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
  if (err) throw err;
  const dataArrays = data.toString().split("\n");
  const draws = dataArrays[0].split(",").map((str) => +str);

  const boards = buildBoards(dataArrays);
  let wonBoards = [];

  let result;
  for (let index = 0; index < draws.length; index++) {
    const nextDraw = draws[index];
    // console.log(nextDraw);
    boards.forEach((board) => {
      if (!board.won) {
        board.columns.forEach((column) => removeItem(column, nextDraw));
        board.rows.forEach((row) => removeItem(row, nextDraw));
        const bingo = isEmpty(board.columns) || isEmpty(board.rows);
        if (bingo) {
          // console.log(board.rows);
          const sum = board.rows.flat().reduce((pv, cv) => pv + cv, 0);
          // console.log(sum, nextDraw);
          result = sum * nextDraw;
          board.won = true;
          board.score = result;
          wonBoards.push(board);
        }
      }
    });
  }

  console.log(wonBoards);
});

function isEmpty(lines) {
  let isEmpty = false;
  lines.forEach((line) => {
    if (line.length === 0) {
      isEmpty = true;
    }
  });
  return isEmpty;
}

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function buildBoards(dataArrays) {
  const boardsRaw = dataArrays.slice(2, dataArrays.length);

  let boards = [];

  let currentBoard: Board = { rows: [], columns: [] };
  currentBoard.columns.push([], [], [], [], []);

  boardsRaw.forEach((element) => {
    if (element.length > 1) {
      const rowsRaw = element.split(" ").filter((str) => str != "");
      const rows = rowsRaw.map((str) => +str);
      rowsRaw.map((item, index) => {
        currentBoard.columns[index].push(+item);
      });
      currentBoard.rows.push(rows);
    } else {
      boards.push(currentBoard);
      currentBoard = { rows: [], columns: [] };
      currentBoard.columns.push([], [], [], [], []);
    }
  });
  return boards;
}

interface Board {
  columns?: [number[]?];
  rows?: [number[]?];
  won?: boolean;
  score?: number;
}
