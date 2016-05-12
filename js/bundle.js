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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	
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
	  // row = node.pos[0] + 1, col = node.pos[1] + 1
	  // i = row * col - 1, boardArray[i] === node
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map