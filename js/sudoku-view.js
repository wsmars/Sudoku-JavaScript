var Game = require("../lib/game");

function View ($sudoku, $board) {
  this.$sudoku = $sudoku;
  this.$board = $board;
  this.addEvents();
  this.bindEvents();
}

View.prototype.addEvents = function () {
  $easyBtn = $("<button>");
  $easyBtn.attr("id", "easy-btn");
  $easyBtn.append("Easy Mode");
  $easyBtn.addClass("level-btn");

  $middleBtn = $("<button>");
  $middleBtn.attr("id", "middle-btn");
  $middleBtn.append("Medium Mode");
  $middleBtn.addClass("level-btn");

  $hardBtn = $("<button>");
  $hardBtn.attr("id", "hard-btn");
  $hardBtn.append("Hard Mode");
  $hardBtn.addClass("level-btn");

  this.$board.append($easyBtn);
  this.$board.append($middleBtn);
  this.$board.append($hardBtn);
};

View.prototype.bindEvents = function () {
  var that = this;
  $("#easy-btn").click(function (){
    that.startGame(1);
  });

  $("#middle-btn").click(function (){
    that.startGame(2);
  });

  $("#hard-btn").click(function (){
    that.startGame(3);
  });
};

View.prototype.startGame = function (level) {
  this.game = new Game(level);
  $div = $("<div>");
  $div.addClass("num");
  $div.append(level);
  $("div").remove(".num");
  this.$board.append($div);
};

module.exports = View;
