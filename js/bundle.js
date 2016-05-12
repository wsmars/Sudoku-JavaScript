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
	var View = __webpack_require__(2);
	
	$(function () {
	  var $board = $(".sudoku");
	  var board = new Board();
	  new View($board, board);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	// var NodeTree = require('./nodeTree');
	
	function Board () {
	  this.root = new NodeTree();
	  this.root.pos = [0,0];
	  var rand = [1,2,3,4,5,6,7,8,9];
	  shuffle(rand);
	  this.root.val = rand.pop();
	  this.root.possibleVal = rand;
	}
	
	Board.prototype.createNode = function (node) {
	  var currentNode = new NodeTree(node)
	  currentNode.setNode();
	};
	
	Board.prototype.createFirstRow = function () {
	  var currentNode = this.root;
	  for (var i = 0; i < 8; i++) {
	    var temp = this.createNode(currentNode);
	    currentNode = temp;
	  }
	}
	
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

	function View ($board, board) {
	  this.$board = $board;
	  this.board = board;
	}
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map