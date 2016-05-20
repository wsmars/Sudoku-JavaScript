/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	
	$(function () {
	  var $sudoku = $(".sudoku");
	  var $board = $(".board");
	  new View($sudoku, $board);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	var Clock = __webpack_require__(5);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var NodeTree = __webpack_require__(4);
	
	function Board () {
	  this.root = new NodeTree();
	  this.root.pos = [0,0];
	  var rand = [1,2,3,4,5,6,7,8,9];
	  shuffle(rand);
	  this.root.val = rand.pop();
	  this.root.possibleVal = rand;
	  this.boardArray = [this.root];
	  // find node in boardArray:
	  // row = node.pos[0], col = node.pos[1]
	  // i = row * 9 + col, boardArray[i] === node
	}
	
	// create a node but do not set val for the node
	Board.prototype.createNode = function (node) {
	  var currentNode = new NodeTree(node)
	  currentNode.setNode();
	  return currentNode;
	};
	
	// create the first row of board the node on pos [0,8] does not have val and
	// not included in boardArray.
	Board.prototype.createFirstRow = function () {
	  var currentNode = this.root;
	  for (var i = 0; i < 7; i++) {
	    var temp = this.createNode(currentNode);
	    temp.setVal();
	    currentNode = temp;
	    this.boardArray.push(currentNode);
	  }
	  temp = this.createNode(currentNode);
	  currentNode = temp;
	  return currentNode;
	}
	
	// By backtrack algrithom to generate board
	Board.prototype.createRestNode = function (node) {
	  var currentNode = node;
	  if ((currentNode.pos[0] === 8 && currentNode.pos[1] === 8) && currentNode.possibleVal.length > 0) {
	    currentNode.setVal();
	    this.boardArray.push(currentNode);
	    console.log(this.boardArray.length);
	    return this.boardArray;
	  }
	  if (currentNode.possibleVal.length === 0) {
	    this.boardArray.pop();
	    this.createRestNode(currentNode.prv)
	  }
	  else {
	    currentNode.setVal();
	    this.boardArray.push(currentNode);
	    var nextNode = this.createNode(currentNode);
	    this.createRestNode(nextNode);
	  }
	};
	
	// shuffle an array
	function shuffle(a) {
	  var j, x, i;
	  for (i = a.length; i; i -= 1) {
	    j = Math.floor(Math.random() * i);
	    x = a[i - 1];
	    a[i - 1] = a[j];
	    a[j] = x;
	  }
	}
	
	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function NodeTree (node) {
	  this.prv = typeof node !== 'undefined' ?  node : null;
	  this.nxt = null;
	  this.pos = [];
	  this.val;
	  this.possibleVal = [];
	}
	
	// assign values for properties of node but this.val
	NodeTree.prototype.setNode = function() {
	  this.setLink();
	  this.setPos();
	  this.setPossibleVal();
	}
	
	// link node with previous node
	NodeTree.prototype.setLink = function () {
	  this.prv.nxt = this;
	};
	
	// set this.position
	NodeTree.prototype.setPos = function () {
	  var prv = this.prv;
	  var row, col;
	  var prvRow = this.prv.pos[0];
	  var prvCol = this.prv.pos[1];
	  if (prvCol === 8) {
	    row = (prvRow + 1);
	    col = 0;
	  }
	  else {
	    row = prvRow;
	    col = (prvCol + 1);
	  }
	  this.pos = [row, col];
	};
	
	// setVal by last number of possibleVal array
	NodeTree.prototype.setVal = function () {
	  this.val = this.possibleVal.pop();
	};
	
	// find exists row values
	NodeTree.prototype.rowVals = function () {
	  var result = [];
	  var currentNode = this.prv;
	  var col = this.pos[1];
	  for (var i = 0; i < col; i++) {
	    result.push(currentNode.val);
	    currentNode = currentNode.prv;
	  }
	  return result;
	};
	
	// find exists col values
	NodeTree.prototype.colVals = function () {
	  var result = [];
	  var currentNode = this.prv;
	  var col = this.pos[1];
	  while (currentNode && ((currentNode.pos[0] != 0) || (currentNode.pos[1] >= col))) {
	    if (currentNode.pos[1] === col) {
	      result.push(currentNode.val);
	    }
	    currentNode = currentNode.prv;
	  }
	  return result;
	};
	
	// find exists block values
	NodeTree.prototype.blockVals = function () {
	  var result = [];
	  var range = [[0,2],[3,5],[6,8]];
	  var row = this.pos[0];
	  var col = this.pos[1];
	  var currentNode = this.prv;
	  for (var i = 0; i < range.length; i++) {
	    if (row >= range[i][0] && row <= range[i][1]) {
	      var rangeRow = range[i];
	    }
	  }
	  for (var j = 0; j < range.length; j++) {
	    if (col >= range[j][0] && col <= range[j][1]) {
	      var rangeCol = range[j];
	    }
	  }
	  while (currentNode) {
	    if ((currentNode.pos[0] >= rangeRow[0] && currentNode.pos[0] <= rangeRow[1]) &&
	         currentNode.pos[1] >= rangeCol[0] && currentNode.pos[1] <= rangeCol[1]) {
	      result.push(currentNode.val);
	    }
	    currentNode = currentNode.prv;
	  }
	  return result;
	};
	
	//  find possibleVal which is an array construct by 1-9 which not in rowVals, colVals and blockVals
	NodeTree.prototype.setPossibleVal = function(rowVals, colVals, blockVals) {
	  var rowVals = this.rowVals();
	  var colVals = this.colVals();
	  var blockVals = this.blockVals();
	  var rand = [1,2,3,4,5,6,7,8,9];
	  shuffle(rand);
	  for (var i = 0; i < 9; i++) {
	    if ((!rowVals.includes(rand[i])) && (!colVals.includes(rand[i])) && (!blockVals.includes(rand[i]))) {
	      this.possibleVal.push(rand[i]);
	    }
	  }
	};
	
	// shuffle array
	function shuffle(array) {
	  var j, x, i;
	  for (i = array.length; i; i -= 1) {
	    j = Math.floor(Math.random() * i);
	    x = array[i - 1];
	    array[i - 1] = array[j];
	    array[j] = x;
	  }
	}
	
	module.exports = NodeTree;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Clock () {
	  this.startTime = new Date();
	}
	
	Clock.prototype.parse = function() {
	  var diff = new Date(new Date() - this.startTime);
	  var hour = ((diff.getHours()-16)<10?'0':'') + (diff.getHours()-16)
	  var min = (diff.getMinutes()<10?'0':'') + diff.getMinutes()
	  var sec = (diff.getSeconds()<10?'0':'') + diff.getSeconds()
	  var display = hour + ":" + min + ":" + sec;
	  $("#clock").text(display);
	}
	
	Clock.prototype.tick = function() {
	  var that = this;
	  this.parse();
	  this.interval = setInterval(function() { that.parse() }, 500);
	}
	
	Clock.prototype.stopClock = function() {
	  var that = this;
	
	  clearInterval(that.interval);
	}
	
	module.exports = Clock;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map