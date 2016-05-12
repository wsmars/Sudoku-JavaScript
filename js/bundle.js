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

	var Board = __webpack_require__(1);
	var View = __webpack_require__(3);
	
	$(function () {
	  var $board = $(".sudoku");
	  new View($board);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var NodeTree = __webpack_require__(2);
	
	function Board () {
	  this.root = new NodeTree();
	  this.root.pos = [0,0];
	  var rand = [1,2,3,4,5,6,7,8,9];
	  shuffle(rand);
	  this.root.val = rand.pop();
	  this.root.possibleVal = rand;
	  this.boardArray = [this.root];
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
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	function View ($board, board) {
	  this.$board = $board;
	  this.board = board;
	}
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map