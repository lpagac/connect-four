"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array(WIDTH).fill(null));
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  console.log('HTML board creation ran')

  // create a top row, add id to it, add click event listener to it
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // create cells for top row, set numbered id, append to top row, append top to board
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  /* dynamically creates the main part of html board
    uses HEIGHT to create table rows
    uses WIDTH to create table cells for each row */
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // loop through board array starting from bottom up
  //find the first null value and return y value

  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  // piece.classList.add((currPlayer === 1) ? 'p1' : 'p2'))
  piece.classList.add((currPlayer === 1) ? 'p1' : 'p2');
  const id = `${y}-${x}`;
  const cell = document.getElementById(id);
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

// check for tie
// check if all cells in board are filled; if so call, call endGame
function checkForTie() {
  return board.every(row => row.every(cell => cell !== null));
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  // add line to update in-memory board
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (checkForTie()) {
    return endGame('The game is a tie :(')
  }

  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    //Check four cells to see if they're all legal & all color of current
    //player
    return cells.every(([y, x]) =>
      (0 <= y && y < HEIGHT) && (0 <= x && x < WIDTH)
      && (board[y][x] === currPlayer));

  }

  /** using HEIGHT and WIDTH, generate "check list" of coordinates
   for 4 cells (starting here) for each of the different
   ways to win: horizontal, vertical, diagonalDR, diagonalDL*/
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      /* assign values to the below variables for each of the ways to win
      horizontal has been assigned for you
      each should be an array of 4 cell coordinates:
      [ [y, x], [y, x], [y, x], [y, x] ] */

      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
