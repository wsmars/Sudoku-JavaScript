var Board = require('./board');

function Game (level) {
  this.board = new Board();
  var last = this.board.createFirstRow();
  this.board.createRestNode(last);
  this.boardArray = this.board.boardArray;
}
