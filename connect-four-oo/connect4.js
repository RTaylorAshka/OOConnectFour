


class Game{
  constructor(h, w, p1, p2){
    this.WIDTH = w;
    this.HEIGHT = h;
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.players = [p1, p2]
    this.currPlayer = this.players[0];
    this.reset = false;
  }

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    
    // get next spot in column (if none, ignore click)
    let callBack = this.findSpotForCol(x);
    const y = callBack;
    if (y === null) {
      
      return;
    }

    if(this.reset){
      
      return;
    }
  
    // place piece in board and add to HTML table
    
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.id} won!`);
    }
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    // switch players
    if(this.currPlayer == this.players[0]){
      this.currPlayer = this.players[1]
    } else {
      this.currPlayer = this.players[0]
    }
  }

  makeHtmlBoard() {
    const htBoard = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', (e)=>{this.handleClick(e)});
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    htBoard.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      htBoard.append(row);
    }

  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    console.log("here");
    console.log(this.currPlayer);

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer.id}`);
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.currPlayer.color;


    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);


  }

  endGame(msg) {
    this.reset = true;
    alert(msg);
  }


  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }
  
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
  

}

class Player {
  constructor(color, id){
    this.color = color;
    this.id = id;
  }
}



const start = document.getElementById("start")
let game = null;
let colors = document.querySelectorAll("input");


//console.log(colors[0].value);
start.addEventListener("click", (e) => {
  e.preventDefault();

  if(game !== null){
    let board = document.getElementById("board");
    board.innerHTML = '';
  }
  
  let p1 = new Player(colors[0].value, 1);
  let p2 = new Player(colors[1].value, 1);

  game = new Game(6,7,p1,p2);
  game.makeBoard();
  game.makeHtmlBoard();

})






