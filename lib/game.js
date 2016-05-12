var Board = require('./board');

function Game (level) {
  this.board = new Board();
  var last = this.board.createFirstRow();
  this.board.createRestNode(last); //create a board
  this.boardArray = this.board.boardArray; // put every node from pos [0,0], [0,1],..., [8,8] in an array
  this.startGame(level);
}

Game.prototype.startGame = function (level) {
  if (level === 1) {
    this.easyMode();
  }
  else if (level === 2) {
    this.middleMode();
  }
  else if (level === 3) {
    this.hardMode();
  }
};

Game.prototype.easyMode = function () {

};

Game.prototype.middleMode = function () {

};

Game.prototype.hardMode = function () {

};

Game.prototype.isOver = function () {

};

Game.prototype.winYet = function () {

};



module.exports = Game;
