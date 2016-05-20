var Game = require("../lib/game");
var Clock = require("../lib/clock");

function View ($sudoku, $board) {
  this.$sudoku = $sudoku;
  this.$board = $board;
  this.addMainMenu();
  this.bindEvents();
}

View.prototype.addMainMenu = function () {
  var $ol = $("<ol>");
  $ol.append("<h4>Instruction:</h4>");
  $ol.append("<li>Choose level to start game.</li>");
  $ol.append("<li>The Timer will run once the game started.</li>");
  $ol.append("<li>Selecet an empty box to fill in a number.</li>");
  $ol.append("<li>The number can only be from 1 to 9.</li>");
  $ol.append("<li>Any row, column, 3x3 box can only contain same number once.</li>");
  $ol.append("<li>After all boxes filled, click \"Submit\" button to check result.</li>");
  $ol.append("<li>Click \"Back\" return to main menu.</li>");
  $ol.append("<li>Have Fun!</li>");

  var $demoBtn = $("<button>");
  $demoBtn.attr("id", "demo-btn");
  $demoBtn.append("Demo Mode");
  $demoBtn.addClass("level-btn");

  var $easyBtn = $("<button>");
  $easyBtn.attr("id", "easy-btn");
  $easyBtn.append("Easy Mode");
  $easyBtn.addClass("level-btn");

  var $middleBtn = $("<button>");
  $middleBtn.attr("id", "middle-btn");
  $middleBtn.append("Medium Mode");
  $middleBtn.addClass("level-btn");

  var $hardBtn = $("<button>");
  $hardBtn.attr("id", "hard-btn");
  $hardBtn.append("Hard Mode");
  $hardBtn.addClass("level-btn");

  var $container = $("<div>");
  $container.addClass("btn-container");
  $container.append($demoBtn);
  $container.append($easyBtn);
  $container.append($middleBtn);
  $container.append($hardBtn);

  this.$board.append($ol);
  this.$board.append($container);
};

View.prototype.bindEvents = function () {
  var that = this;

  $("#easy-btn").click(function (){
    that.startGame(2);
  });

  $("#middle-btn").click(function (){
    that.startGame(3);
  });

  $("#hard-btn").click(function (){
    that.startGame(4);
  });

  $("#demo-btn").click(function (){
    that.startGame(1);
  });
};

View.prototype.startGame = function (level) {
  var that = this;
  clearTimeout(window.timeOut);
  $(".grid").remove();
  $(".loading").remove();
  if (this.clock) {
    this.clock.stopClock();
  }
  var $div = $("<div>");
  $div.addClass("loading");
  $div.append("Loading...");
  this.$board.html($div);
  window.timeOut = setTimeout(function() {
    $(".loading").text("");
    that.createGame(level);
  }, 1000);
};

View.prototype.createGame = function (level) {
  this.game = new Game(level);
  this.clock = new Clock();

  var $container = $("<div>");
  $container.addClass("table-container");
  this.$board.html($container);

  this.setupClock(this.clock);
  this.setupTable(this.game);

  this.setupReturnBtn();
  this.setupSubmitBtn();
};

View.prototype.setupTable = function (game) {
  var $table = $("<table>");
  $table.addClass("grid");

  var $input = {};
  var $row = {};
  var $entry = {};

  var boardArray = game.boardArray;
  var k;
  for (var i = 0; i < 9; i++) {
    $row[i] = $("<tr>");
    for (var j = 0; j < 9; j++) {
      k = (i*9) + j;
      $entry[k] = $("<td>");
      if (boardArray[k].val) {
        $entry[k].append(boardArray[k].val);
      }
      else {
        $input[k] = $("<input>");
        $input[k].attr("type","number");
        $input[k].data("pos", [i,j]);
        $entry[k].append($input[k]);
      }
      $row[i].append($entry[k]);
    }
    $table.append($row[i]);
  }
  $("table").remove(".grid");

  $(".table-container").append($table);

  var $marginL = $("table").css('margin-left');
  $(".clock-container").css("margin-left", $marginL);
};

View.prototype.setupClock= function (clock) {
  var $div = $("<div>");
  var $h3 = $("<h3>");
  var $h4 = $("<h4>");

  $h4.attr('id', 'clock');
  $div.addClass("clock-container");
  $div.append($h3);
  $div.append($h4);
  $(".table-container").append($div);

  $h3.append("Time: ")
  $h4.append(clock.tick());
};

View.prototype.setupReturnBtn = function () {
  var that = this;
  var $returnBtn = $("<button>");
  var $div = $("<div>");

  $div.addClass("table-btn-container");
  $returnBtn.attr("id", "return-btn");
  $returnBtn.append("Back");
  $returnBtn.addClass("return-btn");
  $div.append($returnBtn);
  $(".table-container").append($div);

  $("#return-btn").click(function (){
    if (that.clock) {
      that.clock.stopClock();
    }
    $("div").remove(".table-container");
    $("div").remove(".btn-container");
    var $sudoku = $(".sudoku");
    var $board = $(".board");
    new View($sudoku, $board);
  });
};

View.prototype.setupSubmitBtn = function () {
  var that = this;
  var $submitBtn = $("<button>");

  $submitBtn.attr("id", "submit-btn");
  $submitBtn.append("Submit");
  $submitBtn.addClass("submit-btn");
  $(".table-btn-container").append($submitBtn);

  $("#submit-btn").click(function (){
    that.handleSubmit();
  });
};

View.prototype.handleSubmit = function () {
  var isOver = this.game.isOver();
  var winYet = this.game.winYet();
  if (isOver && winYet) {
    this.clock.stopClock();
    this.clock.parse();
    $(".submit-btn").remove();
    this.popUpMessage("Congradulations! You Win!");
  }
  else if (isOver && !winYet) {
    this.game.notWinYet(this.popUpMessage.bind(this));
  }
  else {
    this.popUpMessage("Not finish yet!");
  }
};

View.prototype.popUpMessage = function (message) {
  var that = this;
  var $div = $("<div>");
  var $h3 = $("<h3>");
  var $btn = $("<button>");
  $div.addClass("message-container");
  $h3.addClass("message");
  $btn.addClass("message-btn");
  $h3.append(message);
  $div.append($h3);

  $btn.click(function (){
    that.removeMessage()
  });
  $("body").append($div);
  $("body").append($btn);
};

View.prototype.removeMessage = function () {
  $("div").remove(".message-container");
  $("button").remove(".message-btn");
};

module.exports = View;
