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

View.prototype.beforeStart = function (level) {
  var that = this;
  clearTimeout(window.timeOut);
  $("table").remove(".grid");
  $("div").remove(".loading");
  var $div = $("<div>");
  $div.addClass("loading");
  $div.append("Loading");
  this.$board.append($div);
  window.timeOut = setTimeout(function() {
    $("div").remove(".loading");
    that.startGame(level);
  }, 1000);
};

View.prototype.bindEvents = function () {
  var that = this;

  $("#easy-btn").click(function (){
    that.beforeStart(1);
  });

  $("#middle-btn").click(function (){
    that.beforeStart(2);
  });

  $("#hard-btn").click(function (){
    that.beforeStart(3);
  });
};

View.prototype.startGame = function (level) {
  this.game = new Game(level);

  var $table = $("<table>");
  $table.addClass("grid");
  var $row = {};
  var $entry = {};

  var boardArray = this.game.boardArray;
  var k;
  for (var i = 0; i < 9; i++) {
    $row[i] = $("<tr>");
    for (var j = 0; j < 9; j++) {
      k = (i*9) + j;
      $entry[k] = $("<td>");
      $entry[k].append(boardArray[k].val);
      $row[i].append($entry[k]);
    }
    $table.append($row[i]);
  }
  $("table").remove(".grid");
  this.$board.append($table);
};

module.exports = View;
