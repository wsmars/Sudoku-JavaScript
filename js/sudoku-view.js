var Game = require("../lib/game");
var Clock = require("../lib/clock");

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
  var that = this;
  clearTimeout(window.timeOut);
  $("table").remove(".grid");
  if (this.clock) {
    this.clock.stopClock();
  }
  $("div").remove(".clock-container");
  $("div").remove(".loading");
  var $div = $("<div>");
  $div.addClass("loading");
  $div.append("Loading");
  this.$board.append($div);
  window.timeOut = setTimeout(function() {
    $("div").remove(".loading");
    that.createGame(level);
  }, 1000);
};

View.prototype.createGame = function (level) {
  this.game = new Game(level);
  this.clock = new Clock();

  this.setupTable(this.game);
  this.setupClock(this.clock);
};

View.prototype.setupTable = function (game) {
  var $table = $("<table>");
  $table.addClass("grid");
  var $row = {};
  var $entry = {};

  var boardArray = game.boardArray;
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

View.prototype.setupClock= function (clock) {
  var $div = $("<div>");
  var $h3 = $("<h3>");
  var $h4 = $("<h4>");
  $h4.attr('id', 'clock');
  $div.addClass("clock-container");
  $div.append($h3);
  $div.append($h4);
  this.$board.append($div);

  $h3.append("Time: ")
  $h4.append(clock.tick());
};

module.exports = View;
