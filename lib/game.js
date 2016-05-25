var Board = require('./board');

function Game (level) {
  this.board = new Board();
  var last = this.board.createFirstRow();
  this.board.createRestNode(last); //create a board
  this.boardArray = this.board.boardArray; // put every node from pos [0,0], [0,1],..., [8,8] in an array
  this.result = this.setResult();
  this.startGame(level);
}

Game.prototype.setResult = function () {
  var result = [];
  for (var i = 0; i < 81; i++) {
    result.push(this.boardArray[i].val);
  }
  return result;
};

Game.prototype.startGame = function (level) {
  if (level === 2) {
    this.easyMode();
  }
  else if (level === 3) {
    this.middleMode();
  }
  else if (level === 4) {
    this.hardMode();
  }
  else if (level === 1) {
    this.demoMode();
  }
};

Game.prototype.demoMode = function () {
  var cellOne = getRandomInt(0,80);
  var cellTwo = getRandomInt(0,80);
  this.boardArray[cellOne].val = null;
  this.boardArray[cellTwo].val = null;
};

Game.prototype.easyMode = function () {
  this.cellRemove(2);
};

Game.prototype.middleMode = function () {
  this.cellRemove(3);
};

Game.prototype.hardMode = function () {
  this.cellRemove(4);
};

Game.prototype.cellRemove = function (level) {
  var pos = [];
  var rowTemp;
  var colTemp;

  for (var i = 0; i < level; i++) { //remove row 0 ~ 2 & 6 ~ 8
    pos = this.blockPosToRemove();
    for (var j = 0; j < pos.length; j++) {
      rowTemp = pos[j][0];
      colTemp = pos[j][1] + i * 3;
      this.boardArray[rowTemp*9+colTemp].val = null;
      this.boardArray[(8-rowTemp)*9+(8-colTemp)].val = null; // mirror remove;
    }
  }
  var f = [0,1,2,3,4,5,6,7,8];
  shuffle(f);
  for (var n = 0; n < 2+level; n++) { // remove row 3 & 5
    colTemp = f[n];
    this.boardArray[3*9+colTemp].val = null;
    this.boardArray[5*9+(8-colTemp)].val = null;
  }
  shuffle(f);
  for (var n = 0; n < 2+level; n++) { // remove row 4
    colTemp = f[n];
    this.boardArray[4*9+colTemp].val = null;
  }
};

Game.prototype.blockPosToRemove = function() {
  var ary = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ary.push([i, j]);
    }
  }
  shuffle(ary);
  for (var k = 0; k < 5; k++) { // k is bigger, the game is easier
    ary.pop();
  }
  return ary;
};

Game.prototype.isOver = function () {
  var pos, value, i;
  var boardArray = this.boardArray;
  $("input").each(function (){
    value = $(this).val();
    pos = $(this).data("pos");
    i = pos[0] * 9 + pos[1];
    if (value) {
      boardArray[i].val = Number(value);
    }
  })
  for (var j = 0; j < boardArray.length; j++) {
    if (!boardArray[j].val) {
      return false;
    }
  }
  return true;
};

Game.prototype.winYet = function () {
  var that = this;
  var result = true;
  $("input").each(function (){
    value = Number($(this).val());
    pos = $(this).data("pos");
    i = pos[0] * 9 + pos[1];
    if (value !== that.result[i]) {
      result = false;
    }
  })
  return result;
};

Game.prototype.notWinYet = function (callback) {
  var that = this;
  $("input").each(function (){
    value = Number($(this).val());
    pos = $(this).data("pos");
    i = pos[0] * 9 + pos[1];
    if (value !== that.result[i]) {
      var michael = $(this);
      michael.css("color", "red");
      michael.keydown(function() {
        michael.css("color", "black");
      })
    }
  })
  callback("The red number(s) is/are not correct!")
};

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(ary) {
  var j, x, i;
  for (i = ary.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = ary[i - 1];
    ary[i - 1] = ary[j];
    ary[j] = x;
  }
}

module.exports = Game;
